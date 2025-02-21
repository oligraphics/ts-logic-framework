import Rand from 'rand-seed';
import { DynamicContextService } from './dynamic-context.service';
import { DynamicContext } from '../interfaces/dynamic-context.interface';
import { ComputableValue } from '../interfaces/computable-value.interface';
import { DynamicReferencePattern } from '../patterns/dynamic-reference.pattern';
import { MathExpressionStepDto } from '../dto/expressions/math-expression-step.dto';
import { MathExpressionDto } from '../dto/expressions/math-expression.dto';
import { MathExpressionService } from './math-expression.service';
import { ConditionalValueDto } from '../dto/conditionals/conditional-value.dto';
import { ConditionalValuesService } from './conditional-values.service';
import { StringService } from './string.service';
import { SelectionDto } from '../dto/selection/selection.dto';
import { SelectionService } from './selection.service';

export const LogicService = new (class LogicService {
  resolve<T>(
    value: ComputableValue,
    context: DynamicContext,
    debug = false,
  ): T | undefined {
    if (debug) {
      console.debug('Resolving', value);
    }
    // No value
    if (value === null || value === undefined) {
      return value as T;
    }
    // Primitives
    if (
      typeof value === 'number' ||
      typeof value === 'bigint' ||
      typeof value === 'boolean' ||
      typeof value === 'symbol'
    ) {
      if (debug) {
        console.debug(value, 'is a primitive');
      }
      return value as T;
    }

    // String
    if (typeof value === 'string') {
      if (DynamicReferencePattern.variable.test(value)) {
        if (debug) {
          console.debug(value, 'is a variable reference');
        }
        return this.resolveVariable<T>(value, context, debug);
      } else if (DynamicReferencePattern.property.test(value)) {
        if (debug) {
          console.debug(value, 'is a property reference');
        }
        return this.resolveProperty<T>(value, context, debug);
      } else {
        if (debug) {
          console.debug(value, 'is a regular string');
        }
        return StringService.applyTextVariables(value, context, debug) as T;
      }
    }

    // Array
    if (Array.isArray(value)) {
      if (value.length > 0 && (value[0] as MathExpressionStepDto)?.operation) {
        if (debug) {
          console.debug('Value is Function');
        }
        const innerContext: DynamicContext =
          DynamicContextService.cloneContext(context);
        for (let i = 0; i < value.length; i++) {
          const currentValue = this.resolve(value[i], innerContext, debug);
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
          console.debug('Value is a regular array');
        }
        for (let i = 0; i < value.length; i += 1) {
          value[i] = this.resolve(value[i], context, debug);
        }
        return value as T;
      }
    }

    // Conditional
    const conditional: ConditionalValueDto = value as ConditionalValueDto;
    if (conditional?.if) {
      if (debug) {
        console.debug('Value is a conditional');
      }
      return ConditionalValuesService.resolve(conditional, context, debug);
    }

    // Expression
    if ((value as MathExpressionDto)?.operation) {
      const expression: MathExpressionDto = value as MathExpressionDto;
      return MathExpressionService.resolve(expression, context, debug) as T;
    }

    // Query
    if ((value as SelectionDto)?.select?.from) {
      const selection = value as SelectionDto;
      return SelectionService.resolve<[]>(selection, context, debug) as T;
    }

    // Static
    return value as T;
  }

  resolveVariable<T>(
    name: string,
    context: DynamicContext,
    debug?: boolean,
  ): T | undefined {
    if (debug) {
      console.debug('Looking up variable', name);
    }
    if (!context) {
      if (debug) {
        console.error('Cannot look up', name, 'in undefined context.');
      }
      return undefined as T;
    }
    const pathParts = name.split('.');
    const initialKey = pathParts[0];
    return this.resolveNested<T>(name, initialKey, pathParts, context, debug);
  }

  resolveProperty<T>(
    name: string,
    context: DynamicContext,
    debug?: boolean,
  ): T | undefined {
    if (debug) {
      console.debug('Looking up property', name);
    }
    if (!context) {
      if (debug) {
        console.error('Cannot look up', name, 'in undefined context.');
      }
      return undefined as T;
    }
    const pathParts = name.substring(1, name.length - 1).split('.');
    const initialKey = `{${pathParts[0]}}`;
    return this.resolveNested<T>(name, initialKey, pathParts, context, debug);
  }

  resolveNested<T>(
    fullPath: string,
    initialKey: string,
    pathParts: string[],
    context: DynamicContext,
    debug?: boolean,
  ): T | undefined {
    if (context[initialKey] === undefined) {
      if (debug) {
        console.warn(
          'Context does not contain a value for ',
          `${initialKey}`,
          'Available keys:',
          ...Object.keys(context),
        );
      }
      return undefined;
    }
    const initialValue = context[initialKey];
    let currentValue: any = this.resolve(initialValue, context, debug);
    if (debug) {
      console.debug('Root value:', currentValue);
    }
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
      if (currentValue[pathParts[i]] === undefined) {
        if (debug) {
          console.warn(
            'No value found for path part',
            pathParts[i],
            'in path',
            fullPath,
          );
        }
        return undefined;
      }
      currentValue = currentValue[pathParts[i]];
    }
    if (debug) {
      console.debug(fullPath, 'resolves to', currentValue);
    }
    return this.resolve<T>(currentValue, context, debug);
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
        return {};
      }
      const result: { [key: string]: any } = { ...base };
      for (const key of Object.keys(overrides)) {
        result[key] = this.applyOverrides(base[key], overrides[key]);
      }
      return result;
    } else if (overrides instanceof Array) {
      if (!(base instanceof Array) || base.length === 0) {
        return [...overrides];
      }
      const result = [...base];
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
          appended.push(override);
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
