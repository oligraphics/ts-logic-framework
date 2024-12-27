import { MathOperationService } from './math-operation.service.js';
import { MathExpressionDto } from '../dto/expressions/math-expression.dto';
import { OperationEnum } from '../enums/operation.enum';
import { DynamicContext } from '../interfaces/dynamic-context.interface';
import { LogicService } from './logic.service';
import { MathExpressionStepDto } from '../dto/expressions/math-expression-step.dto';
import { DynamicValue } from '../interfaces/dynamic-value.interface';
import { IdService } from './id.service';
import { DynamicReferencePattern } from '../patterns/dynamic-reference.pattern';

export const MathExpressionService = new (class MathExpressionService {
  resolve(
    expression: MathExpressionDto | number | string,
    context: DynamicContext,
  ): number {
    if ('number' === typeof expression) {
      return expression;
    }
    if ('string' === typeof expression) {
      return context[expression] ?? 0;
    }
    const a = LogicService.resolve<number>(expression.a, context);
    const b = LogicService.resolve<number>(expression.b, context);
    const result = (expression as MathExpressionStepDto)?.result;
    return MathOperationService.run(
      expression.operation,
      a,
      b,
      expression.debug,
      expression.debugLabel ?? `#${result ?? 'value'}`,
    );
  }

  /**
   * Parses an expression naively. Important: This does not support nesting with
   * () and all multiplications are prioritized over divisions
   * @param input
   */
  parse(input: string): DynamicValue {
    const functionPattern = /([a-zA-Z_]+)\(([^()]*)\)/g;
    const innerMostBracketsPattern = /\(([^()]*)\)/g;
    const strokeOperatorsPattern = /(.+)([+\-])(.+)/g;
    const dotOperatorsPattern = /(.+)([*\/])(.+)/g;
    let current = input.includes(' ') ? input.split(' ').join('') : input;
    const placeholders = new Map<string, DynamicValue>();
    let functionMatch;
    do {
      functionMatch = functionPattern.exec(current);
      if (functionMatch) {
        const matchId = IdService.createRandomId();
        current = current.replace(functionMatch[0], `{${matchId}}`);
        placeholders.set(
          `{${matchId}}`,
          this._parseFunction(functionMatch[1], functionMatch[2].split(',')),
        );
      }
    } while (functionMatch);
    let innerMostBracketsMatch;
    do {
      innerMostBracketsMatch = innerMostBracketsPattern.exec(current);
      if (innerMostBracketsMatch) {
        const matchId = IdService.createRandomId();
        current = current.replace(innerMostBracketsMatch[0], `{${matchId}}`);
        placeholders.set(`{${matchId}}`, this.parse(innerMostBracketsMatch[1]));
      }
    } while (innerMostBracketsMatch);
    let strokeOperatorsMatch;
    do {
      strokeOperatorsMatch = strokeOperatorsPattern.exec(current);
      if (strokeOperatorsMatch) {
        const matchId = IdService.createRandomId();
        current = current.replace(strokeOperatorsMatch[0], `{${matchId}}`);
        placeholders.set(
          `{${matchId}}`,
          this._parseOperator(
            strokeOperatorsMatch[1],
            strokeOperatorsMatch[2],
            strokeOperatorsMatch[3],
          ),
        );
      }
    } while (strokeOperatorsMatch);
    let dotOperatorsMatch;
    do {
      dotOperatorsMatch = dotOperatorsPattern.exec(current);
      if (dotOperatorsMatch) {
        const matchId = IdService.createRandomId();
        current = current.replace(dotOperatorsMatch[0], `{${matchId}}`);
        placeholders.set(
          `{${matchId}}`,
          this._parseOperator(
            dotOperatorsMatch[1],
            dotOperatorsMatch[2],
            dotOperatorsMatch[3],
          ),
        );
      }
    } while (dotOperatorsMatch);
    return current.startsWith('{') && current.endsWith('}')
      ? this._resolve(current, placeholders)
      : current.match(/[0-9.-]+/g)
      ? parseFloat(current)
      : current;
  }

  /**
   * Turn the expression into mathematical notation
   * @param input The input expression
   * @param wrap Whether to wrap the result in round brackets if it is an expression (default: <code>() => false</code>)
   */
  stringify(
    input: DynamicValue,
    wrap?: (value: DynamicValue) => boolean,
  ): string {
    if (Array.isArray(input)) {
      const stepsMap = new Map<string, string>();
      for (const step of input) {
        stepsMap.set(
          step.result ?? 'result',
          this.stringify(step, () => true),
        );
      }
      let result: string = stepsMap.get('result') ?? '';
      if (!result) {
        return '';
      }
      for (const [key, value] of stepsMap) {
        result = result.replace(`#${key}`, value);
      }
      return result;
    } else if (typeof input === 'object') {
      const expression = input as MathExpressionDto;
      const a = this.stringify(expression.a, (v: DynamicValue) =>
        this.requireWrapping(expression.operation, v, false),
      );
      const b = this.stringify(expression.b, (v: DynamicValue) =>
        this.requireWrapping(expression.operation, v, true),
      );
      let result;
      switch (expression.operation) {
        case OperationEnum.POW:
          return `pow(${a}, ${b})`;
        default:
          result = `${a} ${MathOperationService.stringify(
            expression.operation,
          )} ${b}`;
          break;
      }
      return wrap && wrap(expression) ? `(${result})` : result;
    } else {
      return (input?.toString() ?? '').trim();
    }
  }

  requireWrapping(
    outerOperation: OperationEnum,
    value: DynamicValue,
    isRightSide: boolean,
  ): boolean {
    const innerOperation = (value as MathExpressionDto)?.operation;
    if (!innerOperation) {
      return false;
    }
    const outerWeight = MathOperationService.getWeight(outerOperation);
    const innerWeight = MathOperationService.getWeight(innerOperation);
    console.log(
      outerOperation,
      outerWeight,
      innerOperation,
      innerWeight,
      'is right side',
      isRightSide,
    );
    if (innerWeight > outerWeight) {
      return false;
    }
    if (innerWeight < outerWeight) {
      return true;
    }
    return (
      isRightSide &&
      outerOperation !== OperationEnum.ADD &&
      outerOperation !== OperationEnum.MULTIPLY
    );
  }

  _resolve(
    input: unknown,
    placeholders: Map<string, DynamicValue>,
  ): DynamicValue {
    if (typeof input === 'string') {
      return placeholders.has(input)
        ? this._resolve(placeholders.get(input), placeholders)
        : input;
    }
    if (Array.isArray(input)) {
      return input.map((value) => this._resolve(value, placeholders));
    }
    if (typeof input === 'object') {
      const expression = input as MathExpressionDto;
      return {
        operation: expression.operation,
        a: this._resolve(expression.a, placeholders),
        b: this._resolve(expression.b, placeholders),
      };
    }
    return input as DynamicValue;
  }

  _parseFunction(name: string, args: string[]): MathExpressionDto {
    switch (name) {
      case 'pow':
        return {
          operation: OperationEnum.POW,
          a: args[0].startsWith('{') ? args[0] : this.parse(args[0]),
          b: args[1].startsWith('{') ? args[1] : this.parse(args[1]),
        };
      default:
        throw new Error('Unknown function name ' + name);
    }
  }

  _parseOperator(a: string, operator: string, b: string): MathExpressionDto {
    return {
      operation: MathOperationService.parse(operator),
      a: DynamicReferencePattern.property.test(a) ? a : this.parse(a),
      b: DynamicReferencePattern.property.test(b) ? b : this.parse(b),
    };
  }
})();
