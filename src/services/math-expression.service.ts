import { MathOperationService } from './math-operation.service.js';
import { MathExpressionDto } from '../dto/expressions/math-expression.dto';
import { OperationEnum } from '../enums/operation.enum';
import { DynamicContext } from '../interfaces/dynamic-context.interface';
import { LogicService } from './logic.service';
import { MathExpressionStepDto } from '../dto/expressions/math-expression-step.dto';
import { DynamicValue } from '../interfaces/dynamic-value.interface';

export const MathExpressionService = new (class MathExpressionService {
  _operators: Map<OperationEnum, string> = new Map([
    [OperationEnum.ADD, '+'],
    [OperationEnum.SUBTRACT, '-'],
    [OperationEnum.MULTIPLY, '*'],
    [OperationEnum.DIVIDE, '/'],
    [OperationEnum.POW, '**'],
  ]);

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
  parse(input: string): MathExpressionDto | number | string {
    const trimmed = input.includes(' ') ? input.split(' ').join('') : input;
    for (const [operation, operator] of this._operators.entries()) {
      if (trimmed.includes(operator)) {
        const parts = trimmed.split(operator);
        return this._parseExpression(operation, operator, parts);
      }
    }

    const value = parseFloat(trimmed);
    return !isNaN(value) ? value : trimmed;
  }

  stringify(input: DynamicValue, wrap?: boolean): string {
    if (Array.isArray(input)) {
      const stepsMap = new Map<string, string>();
      for (const step of input) {
        stepsMap.set(step.result ?? 'result', this.stringify(step, true));
      }
      let result: string = stepsMap.get('result') ?? '';
      if (!result) {
        console.log(
          'Function did not provide a step that returns the result.',
          JSON.stringify(input),
        );
        return '';
      }
      for (const [key, value] of stepsMap) {
        result = result.replace(`#${key}`, value);
      }
      return result;
    } else if (typeof input === 'object') {
      const expression = input as MathExpressionDto;
      const a = this.stringify(expression.a, true);
      const b = this.stringify(expression.b, true);
      const result = `${a} ${MathOperationService.stringify(
        expression.operation,
      )} ${b}`;
      return wrap ? `(${result})` : result;
    } else {
      return (input?.toString() ?? '').trim();
    }
  }

  _parseExpression(
    operation: OperationEnum,
    operator: string,
    parts: string[],
  ): MathExpressionDto {
    const a = parts[0];
    const b = parts.slice(1).join(operator);
    return {
      operation: operation,
      a: this.parse(a),
      b: this.parse(b),
    };
  }
})();
