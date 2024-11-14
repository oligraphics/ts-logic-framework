import Rand from 'rand-seed';
import { DynamicContextService } from './dynamic-context.service';
import { DynamicContext } from '../interfaces/dynamic-context.interface';
import { DynamicValue } from '../interfaces/dynamic-value.interface';
import { DynamicReferencePattern } from '../patterns/dynamic-reference.pattern';
import { MathExpressionStepDto } from '../dto/expressions/math-expression-step.dto';
import { MathExpressionDto } from '../dto/expressions/math-expression.dto';
import { MathExpressionService } from './math-expression.service';
import { ConditionalValueDto } from '../dto/conditionals/conditional-value.dto';
import { ConditionalValuesService } from './conditional-values.service';

export const LogicService = new (class LogicService {
  resolve<T>(value: DynamicValue, context: DynamicContext, debug = false): T {
    if (debug) {
      console.log('Looking up', JSON.stringify(value));
    }
    if (
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      value === null ||
      value === undefined
    ) {
      if (debug) {
        console.log(value, 'is a primitive');
      }
      return value as T;
    }

    if (typeof value === 'string') {
      if (DynamicReferencePattern.variable.test(value)) {
        if (debug) {
          console.log(value, 'is a variable reference');
        }
        return this.resolveVariable<T>(value, context);
      } else if (DynamicReferencePattern.property.test(value)) {
        if (debug) {
          console.log(value, 'is a property reference');
        }
        return this.resolveProperty<T>(value, context);
      } else {
        if (debug) {
          console.log(value, 'is a regular string');
        }
        return value as T;
      }
    }

    if (Array.isArray(value)) {
      if (value.length > 0 && (value[0] as MathExpressionStepDto)?.operation) {
        if (debug) {
          console.log('Value is Function');
        }
        const innerContext: DynamicContext =
          DynamicContextService.cloneContext(context);
        for (let i = 0; i < value.length; i++) {
          const currentValue = this.resolve(value[i], innerContext);
          if (i === value.length - 1) {
            return currentValue as T;
          }
          const expression = value[i] as MathExpressionStepDto;
          const variable =
            (expression ? expression.result : undefined) ?? 'value';
          innerContext[`#${variable}`] = currentValue;
        }
      } else {
        if (debug) {
          console.log('Value is a regular array');
        }
        for (let i = 0; i < value.length; i += 1) {
          value[i] = this.resolve(value[i], context);
        }
        return value as T;
      }
    }

    const conditional: ConditionalValueDto = value as ConditionalValueDto;
    if (conditional?.if) {
      if (debug) {
        console.log('Value is a conditional');
      }
      return ConditionalValuesService.resolve(conditional, context);
    }

    if (debug) {
      console.log('Value is a math expression');
    }
    const expression: MathExpressionDto = value as MathExpressionDto;
    return MathExpressionService.resolve(expression, context) as T;
  }

  resolveVariable<T>(name: string, context: DynamicContext): T {
    const pathParts = name.split('.');
    let currentValue = context[pathParts[0]] ?? undefined;
    for (let i = 1; i < pathParts.length; i++) {
      if (
        typeof currentValue === 'string' ||
        typeof currentValue === 'number' ||
        typeof currentValue === 'boolean' ||
        currentValue === null ||
        currentValue === undefined
      ) {
        return currentValue as T;
      }
      currentValue = currentValue[pathParts[i]];
    }
    return currentValue as T;
  }

  resolveProperty<T>(name: string, context: DynamicContext): T {
    const pathParts = name.substring(1, name.length - 1).split('.');
    let currentValue = context[`{${pathParts[0]}}`] ?? undefined;
    for (let i = 1; i < pathParts.length; i++) {
      if (
        typeof currentValue === 'string' ||
        typeof currentValue === 'number' ||
        typeof currentValue === 'boolean' ||
        currentValue === null ||
        currentValue === undefined
      ) {
        return currentValue as T;
      }
      currentValue = currentValue[pathParts[i]];
    }
    return currentValue as T;
  }

  createVariableMap(
    variables: Map<string, any>,
    parentPath: string,
  ): Map<string, any> {
    const result = new Map<string, any>();
    for (const [key, value] of variables) {
      result.set(`${parentPath}.${key}`, value);
    }
    return result;
  }

  /**
   * Replaces all occurrences of the provided variables with their value.
   * @param input
   * @param variables
   */
  applyVariables(input: any, variables: Map<string, any>): any {
    if (input == null) {
      return null;
    }
    if (typeof input === 'string') {
      for (const [key, value] of variables) {
        if (input === `{${key}}`) {
          return value;
        }
      }
      return this.applyTextVariables(input, variables);
    }
    if (input instanceof Array) {
      const result = [];
      for (const value of input) {
        result.push(this.applyVariables(value, variables));
      }
      return result;
    }
    if (typeof input === 'object') {
      const result: { [key: string]: any } = {};
      for (const key of Object.keys(input)) {
        result[key] = this.applyVariables(input[key], variables);
      }
      return result;
    }
    return input;
  }

  applyTextVariables(text: string, variables: Map<string, any>): string {
    for (const [key, value] of variables) {
      text = text.split(`{${key}}`).join(value);
    }
    return text;
  }

  applyOverrides(
    base: { [key: string]: any },
    overrides: { [key: string]: any },
  ): { [key: string]: any } {
    if (!overrides) {
      if (!base) {
        return JSON.parse(JSON.stringify(overrides));
      }
      const result: { [key: string]: any } = JSON.parse(JSON.stringify(base));
      for (const key of Object.keys(overrides)) {
        result[key] = this.applyOverrides(base[key], overrides[key]);
      }
      return result;
    } else if (overrides instanceof Array) {
      if (!(base instanceof Array) || base.length === 0) {
        return JSON.parse(JSON.stringify(overrides));
      }
      const result = JSON.parse(JSON.stringify(base));
      const appended = [];
      for (let i = 0; i < overrides.length; i++) {
        const override = overrides[i];
        if (override instanceof Object) {
          const id = override['id'];
          const existing =
            id != null
              ? base.find(
                  (element) =>
                    element instanceof Object && element['id'] === id,
                )
              : null;
          if (existing != null) {
            const existingIndex = base.indexOf(existing);
            result[existingIndex] = this.applyOverrides(existing, override);
            continue;
          }
        }
        if (i >= result.length) {
          appended.push(JSON.parse(JSON.stringify(override)));
          continue;
        }
        result[i] = this.applyOverrides(base[i], override);
      }
      for (const entry of appended) {
        result.push(entry);
      }
      return result;
    } else return overrides;
  }

  pickRandomWeighted(options: { [key: string]: any }[], random: Rand): unknown {
    if (options.length === 0) {
      return null;
    }
    let totalWeight = 0;
    for (const option of options) {
      totalWeight += option['weight'] || 1;
    }
    let randomIndex = random.next() * totalWeight;
    for (const option of options) {
      const weight = option['weight'] || 1;
      if (randomIndex > weight) {
        randomIndex -= weight;
        continue;
      }
      return option['value'];
    }
    return null;
  }
})();
