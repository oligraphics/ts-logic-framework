import { Condition } from '../interfaces/condition.interface.ts';
import { DynamicContext } from '../interfaces/dynamic-context.interface.ts';
import { ConditionLogicHandlerInterface } from '../interfaces/condition-logic-handler.interface.ts';
import { ConditionDto } from '../dto/conditions/condition.dto.ts';
import { BooleanLogicTypeEnum } from '../enums/boolean-logic-type.enum.ts';
import { EqualConditionDto } from '../dto/conditions/comparisons/equal.condition.dto.ts';
import { LogicGateDto } from '../dto/conditions/logic/logic-gate.dto.ts';
import { LogicService } from './logic.service.ts';
import { GreaterThanConditionDto } from '../dto/conditions/comparisons/greater-than.condition.dto.ts';
import { LessThanConditionDto } from '../dto/conditions/comparisons/less-than.condition.dto.ts';
import { LessThanOrEqualConditionDto } from '../dto/conditions/comparisons/less-than-or-equal.condition.dto.ts';
import { GreaterThanOrEqualConditionDto } from '../dto/conditions/comparisons/greater-than-or-equal.condition.dto.ts';

export const ConditionService = new (class ConditionService {
  private comparisons = [
    BooleanLogicTypeEnum.EQUAL,
    BooleanLogicTypeEnum.GREATER_THAN,
    BooleanLogicTypeEnum.GREATER_THAN_OR_EQUAL,
    BooleanLogicTypeEnum.LESS_THAN,
    BooleanLogicTypeEnum.LESS_THAN_OR_EQUAL,
  ];

  /**
   * @returns <code>true</code> if the result of the test is true, otherwise
   * returns the condition that failed.
   */
  testCondition(
    condition: Condition,
    context: DynamicContext,
    handler?: ConditionLogicHandlerInterface,
  ): true | Condition {
    if (typeof condition === 'string') {
      const parsed = LogicService.resolve(condition, context);
      if (typeof parsed === 'string' && parsed === condition) {
        return parsed;
      }
      return this.testCondition(parsed as Condition, context, handler);
    }

    if (typeof condition === 'boolean') {
      return condition ? true : condition;
    }
    if (typeof condition === 'number') {
      return condition >= 1 ? true : condition;
    }

    const logic = condition as ConditionDto;

    if (handler !== undefined && handler.canTest(logic.type)) {
      return handler.testLogic(context, logic, handler);
    }

    if (logic.type === BooleanLogicTypeEnum.NONE) {
      return logic.invert ? true : logic;
    }

    if (!Object.values(BooleanLogicTypeEnum).includes(logic.type)) {
      console.warn('Unknown logic type ' + logic.type);
      return logic;
    }

    if (this.comparisons.includes(logic.type)) {
      return this.testComparison(condition, context);
    }

    const logicGate = <LogicGateDto>logic;
    /**
     * @var conditions Array of key value pairs where the key is the condition
     * and the value is either true or the condition <code>true</code> means
     * the condition tested true, otherwise the condition is returned as the value.
     */
    const conditions: [Condition, true | Condition][] =
      logicGate.conditions.map((condition) => [
        condition,
        this.testCondition(condition, context, handler),
      ]);

    switch (logic.type) {
      case BooleanLogicTypeEnum.AND:
        const firstFalse = conditions.find((c) => c[1] !== true);
        return firstFalse == null ? true : firstFalse[1];
      case BooleanLogicTypeEnum.OR:
        return conditions.find((c) => c[1] === true) != null ? true : logic;
      case BooleanLogicTypeEnum.NAND:
        return conditions.find((c) => c[1] !== true) != null ? true : logic;
      case BooleanLogicTypeEnum.NOR:
        const firstTrue = conditions.find((c) => c[1] === true);
        return firstTrue == null ? true : firstTrue[0];
      case BooleanLogicTypeEnum.XOR:
        return conditions.length > 0 &&
          conditions.filter((c) => c[1] === true).length > 0 ===
            conditions.filter((c) => c[1] !== true).length > 0
          ? true
          : logic;
      default:
        return logic;
    }
  }

  testComparison(
    logic: ConditionDto,
    context: DynamicContext,
  ): true | Condition {
    const debugLabel = logic.debug
      ? (logic.debugLabel ?? 'Test') + (logic.invert ? ' (invert)' : '')
      : undefined;
    switch (logic.type) {
      case BooleanLogicTypeEnum.EQUAL: {
        const valueLogic = logic as EqualConditionDto;
        const input = LogicService.resolve(valueLogic.value, context);
        const value = LogicService.resolve(valueLogic.equals, context);
        let result: boolean;
        if (Array.isArray(value)) {
          if (Array.isArray(input)) {
            // All elements in value must be included in input
            result = value.find((v) => !input.includes(v)) === null;
          } else {
            // Value must include the input
            result = value.includes(input);
          }
        } else if (Array.isArray(input)) {
          // Input must include the value
          result = input.includes(value);
        } else {
          // Input must equal value
          result = input === value;
        }
        if (logic.debug) {
          console.log(
            debugLabel,
            input,
            Array.isArray(value) ? 'in' : '=',
            value,
            result,
          );
        }
        return result !== logic.invert ? true : logic;
      }
      case BooleanLogicTypeEnum.GREATER_THAN: {
        const valueLogic = logic as GreaterThanConditionDto;
        const input = LogicService.resolve(valueLogic.value, context) as number;
        const value = LogicService.resolve(
          valueLogic.greaterThan,
          context,
        ) as number;
        const result = input > value;
        if (logic.debug) {
          console.log(debugLabel, input, '>', value, result);
        }
        return result !== logic.invert ? true : logic;
      }
      case BooleanLogicTypeEnum.GREATER_THAN_OR_EQUAL: {
        const valueLogic = logic as GreaterThanOrEqualConditionDto;
        const input = LogicService.resolve(valueLogic.value, context) as number;
        const value = LogicService.resolve(
          valueLogic.greaterThanOrEqual,
          context,
        ) as number;
        const result = input >= value;
        if (logic.debug) {
          console.log(debugLabel, input, '>=', value, result);
        }
        return result !== logic.invert ? true : logic;
      }
      case BooleanLogicTypeEnum.LESS_THAN_OR_EQUAL: {
        const valueLogic = logic as LessThanOrEqualConditionDto;
        const input = LogicService.resolve(valueLogic.value, context) as number;
        const value = LogicService.resolve(
          valueLogic.lessThanOrEqual,
          context,
        ) as number;
        const result = input <= value;
        if (logic.debug) {
          console.log(debugLabel, input, '<=', value, result);
        }
        return result !== logic.invert ? true : logic;
      }
      case BooleanLogicTypeEnum.LESS_THAN: {
        const valueLogic = logic as LessThanConditionDto;
        const input = LogicService.resolve(valueLogic.value, context) as number;
        const value = LogicService.resolve(
          valueLogic.lessThan,
          context,
        ) as number;
        const result = input < value;
        if (logic.debug) {
          console.log(debugLabel, input, '<', value, result);
        }
        return result !== logic.invert ? true : logic;
      }
      default: {
        throw new Error(`Comparison type ${logic.type} is not implemented.`);
      }
    }
  }
})();
