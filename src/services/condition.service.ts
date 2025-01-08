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
import { LikeConditionDto } from '../dto/conditions/comparisons/like.condition.dto';
import { LikenessService } from './likeness.service';
import { PatternConditionDto } from '../dto/conditions/comparisons/pattern.condition.dto';

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
    debug?: boolean,
  ): true | Condition {
    if (debug) {
      console.debug('Check condition', condition);
    }
    // No value
    if (condition === null || condition === undefined) {
      if (debug) {
        console.error('Condition is empty');
      }
      return condition;
    }

    // Primitives
    if (typeof condition === 'boolean') {
      return condition ? true : condition;
    }
    if (typeof condition === 'number') {
      return condition >= 1 ? true : condition;
    }

    // Strings
    if (typeof condition === 'string') {
      const parsed = LogicService.resolve(condition, context, debug);
      if (typeof parsed === 'string' && parsed === condition) {
        if (debug) {
          console.error('Condition does not return a boolean', condition);
        }
        return parsed;
      }
      return this.testCondition(parsed as Condition, context, debug);
    }

    // Condition Logic
    const logic = condition as ConditionDto;

    if (!logic.type) {
      if (debug) {
        console.error('Invalid condition logic without a type:', condition);
        return logic;
      }
    }

    if (logic.type === BooleanLogicTypeEnum.NONE) {
      if (debug) {
        console.debug('Empty condition, result is', logic.invert);
      }
      return logic.invert ? true : logic;
    }

    if (!Object.values(BooleanLogicTypeEnum).includes(logic.type)) {
      console.warn('Unknown logic type ' + logic.type);
      return logic;
    }

    if (this.comparisons.includes(logic.type)) {
      if (debug) {
        console.debug('Perform comparison', logic.type);
      }
      return this.testComparison(condition, context, debug);
    }

    if (debug) {
      console.debug('Run logic gate', logic.type);
    }
    const logicGateResult = LogicGateService.test(
      <LogicGateDto>logic,
      context,
      debug,
    );
    if (logic.invert) {
      return logicGateResult === true ? logicGateResult : true;
    } else {
      return logicGateResult === true ? true : logicGateResult;
    }
  }

  testComparison(
    logic: ConditionDto,
    context: DynamicContext,
    debug?: boolean,
  ): true | Condition {
    const invert = logic.invert === true;
    const debugLabel =
      logic.debug || debug
        ? (logic.debugLabel ?? 'Test') + (invert ? ' (invert)' : '')
        : undefined;
    switch (logic.type) {
      case BooleanLogicTypeEnum.EQUAL: {
        const valueLogic = logic as EqualConditionDto;
        const value = LogicService.resolve(
          valueLogic.value,
          context,
          logic.debug || debug,
        );
        const equals = LogicService.resolve(
          valueLogic.equals,
          context,
          logic.debug || debug,
        );
        const result = EqualityService.test(value, equals);
        if (logic.debug || debug) {
          console.debug(debugLabel, value, 'equals', equals, '=', result);
        }
        return result !== invert ? true : logic;
      }
      case BooleanLogicTypeEnum.LIKE: {
        const valueLogic = logic as LikeConditionDto;
        const value = LogicService.resolve(
          valueLogic.value,
          context,
          logic.debug || debug,
        );
        const equals = LogicService.resolve(
          valueLogic.equals,
          context,
          logic.debug || debug,
        );
        const result = LikenessService.test(value, equals);
        if (logic.debug || debug) {
          console.debug(debugLabel, value, 'like', equals, '=', result);
        }
        return result !== invert ? true : logic;
      }
      case BooleanLogicTypeEnum.GREATER_THAN: {
        const valueLogic = logic as GreaterThanConditionDto;
        const input =
          LogicService.resolve<number>(
            valueLogic.value,
            context,
            logic.debug || debug,
          ) ?? 0;
        const value =
          LogicService.resolve<number>(
            valueLogic.greaterThan,
            context,
            logic.debug || debug,
          ) ?? 0;
        const result = input > value;
        if (logic.debug || debug) {
          console.debug(debugLabel, input, '>', value, '=', result);
        }
        return result !== invert ? true : logic;
      }
      case BooleanLogicTypeEnum.GREATER_THAN_OR_EQUAL: {
        const valueLogic = logic as GreaterThanOrEqualConditionDto;
        const input =
          LogicService.resolve<number>(
            valueLogic.value,
            context,
            logic.debug || debug,
          ) ?? 0;
        const value =
          LogicService.resolve<number>(
            valueLogic.greaterThanOrEqual,
            context,
            logic.debug || debug,
          ) ?? 0;
        const result = input >= value;
        if (logic.debug || debug) {
          console.debug(debugLabel, input, '>=', value, '=', result);
        }
        return result !== invert ? true : logic;
      }
      case BooleanLogicTypeEnum.LESS_THAN_OR_EQUAL: {
        const valueLogic = logic as LessThanOrEqualConditionDto;
        const input =
          LogicService.resolve<number>(
            valueLogic.value,
            context,
            logic.debug || debug,
          ) ?? 0;
        const value =
          LogicService.resolve<number>(
            valueLogic.lessThanOrEqual,
            context,
            logic.debug || debug,
          ) ?? 0;
        const result = input <= value;
        if (logic.debug || debug) {
          console.debug(debugLabel, input, '<=', value, '=', result);
        }
        return result !== invert ? true : logic;
      }
      case BooleanLogicTypeEnum.LESS_THAN: {
        const valueLogic = logic as LessThanConditionDto;
        const input =
          LogicService.resolve<number>(
            valueLogic.value,
            context,
            logic.debug || debug,
          ) ?? 0;
        const value =
          LogicService.resolve<number>(
            valueLogic.lessThan,
            context,
            logic.debug || debug,
          ) ?? 0;
        const result = input < value;
        if (logic.debug || debug) {
          console.debug(debugLabel, input, '<', value, '=', result);
        }
        return result !== invert ? true : logic;
      }
      case BooleanLogicTypeEnum.PATTERN: {
        const valueLogic = logic as PatternConditionDto;
        const input = LogicService.resolve<string>(
          valueLogic.value,
          context,
          logic.debug || debug,
        );
        const pattern = LogicService.resolve<string>(
          valueLogic.pattern,
          context,
          logic.debug || debug,
        );
        const flags = valueLogic.flags ?? 'g';
        if (pattern === undefined) {
          if (logic.debug || debug) {
            console.warn(
              'Condition does not provide a regular expression',
              logic,
            );
          }
          return logic;
        }
        const result = input ? new RegExp(pattern, flags).test(input) : false;
        if (logic.debug || debug) {
          console.debug(
            debugLabel,
            input,
            ' matches ',
            `/${pattern}/${flags}`,
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
