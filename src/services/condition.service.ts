import { Condition } from '../interfaces/condition.interface';
import { DynamicContext } from '../interfaces/dynamic-context.interface';
import { ConditionDto } from '../dto/conditions/condition.dto';
import { BooleanLogicTypeEnum } from '../enums/boolean-logic-type.enum';
import { EqualConditionDto } from '../dto/conditions/comparisons/equal.condition.dto';
import { LogicGateDto } from '../dto/conditions/logic/logic-gate.dto';
import { LogicService } from './logic.service';
import { GreaterThanConditionDto } from '../dto/conditions/comparisons/greater-than.condition.dto';
import { LessThanConditionDto } from '../dto/conditions/comparisons/less-than.condition.dto';
import { LessThanOrEqualConditionDto } from '../dto/conditions/comparisons/less-than-or-equal.condition.dto';
import { GreaterThanOrEqualConditionDto } from '../dto/conditions/comparisons/greater-than-or-equal.condition.dto';
import { LogicGateService } from './logic-gate.service';
import { EqualityService } from './equality.service';

export const ConditionService = new (class ConditionService {
  comparisons = [
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
  ): true | Condition {
    if (typeof condition === 'string') {
      const parsed = LogicService.resolve(condition, context);
      if (typeof parsed === 'string' && parsed === condition) {
        return parsed;
      }
      return this.testCondition(parsed as Condition, context);
    }

    if (typeof condition === 'boolean') {
      return condition ? true : condition;
    }
    if (typeof condition === 'number') {
      return condition >= 1 ? true : condition;
    }

    const logic = condition as ConditionDto;

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

    const logicGateResult = LogicGateService.test(<LogicGateDto>logic, context);
    if (logic.invert) {
      return logicGateResult === true ? logicGateResult : true;
    } else {
      return logicGateResult === true ? true : logicGateResult;
    }
  }

  testComparison(
    logic: ConditionDto,
    context: DynamicContext,
  ): true | Condition {
    const invert = logic.invert === true;
    const debugLabel = logic.debug
      ? (logic.debugLabel ?? 'Test') + (invert ? ' (invert)' : '')
      : undefined;
    switch (logic.type) {
      case BooleanLogicTypeEnum.EQUAL: {
        const valueLogic = logic as EqualConditionDto;
        const value = LogicService.resolve(
          valueLogic.value,
          context,
          logic.debug,
        );
        const equals = LogicService.resolve(
          valueLogic.equals,
          context,
          logic.debug,
        );
        const result = EqualityService.test(value, equals);
        if (logic.debug) {
          console.log(
            debugLabel,
            JSON.stringify(value),
            Array.isArray(equals) ? 'in' : '=',
            JSON.stringify(equals),
            '=',
            result,
          );
        }
        return result !== invert ? true : logic;
      }
      case BooleanLogicTypeEnum.GREATER_THAN: {
        const valueLogic = logic as GreaterThanConditionDto;
        const input = LogicService.resolve(
          valueLogic.value,
          context,
          logic.debug,
        ) as number;
        const value = LogicService.resolve(
          valueLogic.greaterThan,
          context,
          logic.debug,
        ) as number;
        const result = input > value;
        if (logic.debug) {
          console.log(
            debugLabel,
            JSON.stringify(input),
            '>',
            JSON.stringify(value),
            '=',
            result,
          );
        }
        return result !== invert ? true : logic;
      }
      case BooleanLogicTypeEnum.GREATER_THAN_OR_EQUAL: {
        const valueLogic = logic as GreaterThanOrEqualConditionDto;
        const input = LogicService.resolve(
          valueLogic.value,
          context,
          logic.debug,
        ) as number;
        const value = LogicService.resolve(
          valueLogic.greaterThanOrEqual,
          context,
          logic.debug,
        ) as number;
        const result = input >= value;
        if (logic.debug) {
          console.log(
            debugLabel,
            JSON.stringify(input),
            '>=',
            JSON.stringify(value),
            '=',
            result,
          );
        }
        return result !== invert ? true : logic;
      }
      case BooleanLogicTypeEnum.LESS_THAN_OR_EQUAL: {
        const valueLogic = logic as LessThanOrEqualConditionDto;
        const input = LogicService.resolve(
          valueLogic.value,
          context,
          logic.debug,
        ) as number;
        const value = LogicService.resolve(
          valueLogic.lessThanOrEqual,
          context,
          logic.debug,
        ) as number;
        const result = input <= value;
        if (logic.debug) {
          console.log(
            debugLabel,
            JSON.stringify(input),
            '<=',
            JSON.stringify(value),
            '=',
            result,
          );
        }
        return result !== invert ? true : logic;
      }
      case BooleanLogicTypeEnum.LESS_THAN: {
        const valueLogic = logic as LessThanConditionDto;
        const input = LogicService.resolve(
          valueLogic.value,
          context,
          logic.debug,
        ) as number;
        const value = LogicService.resolve(
          valueLogic.lessThan,
          context,
          logic.debug,
        ) as number;
        const result = input < value;
        if (logic.debug) {
          console.log(
            debugLabel,
            JSON.stringify(input),
            '<',
            JSON.stringify(value),
            '=',
            result,
          );
        }
        return result !== invert ? true : logic;
      }
      default: {
        throw new Error(`Comparison type ${logic.type} is not implemented.`);
      }
    }
  }
})();
