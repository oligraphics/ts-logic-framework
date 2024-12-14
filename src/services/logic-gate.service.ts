import { Condition } from '../interfaces/condition.interface';
import { AndConditionDto } from '../dto/conditions/logic/and.condition.dto';
import { NandConditionDto } from '../dto/conditions/logic/nand.condition.dto';
import { NorConditionDto } from '../dto/conditions/logic/nor.condition.dto';
import { OrConditionDto } from '../dto/conditions/logic/or.condition.dto';
import { XorConditionDto } from '../dto/conditions/logic/xor.condition.dto';
import { LogicGateDto } from '../dto/conditions/logic/logic-gate.dto';
import { BooleanLogicTypeEnum } from '../enums/boolean-logic-type.enum';
import { ConditionService } from './condition.service';
import { DynamicContext } from '../interfaces/dynamic-context.interface';

export const LogicGateService = new (class LogicGateService {
  test(logicGate: LogicGateDto, context: DynamicContext): true | Condition {
    const debugLabel = logicGate.debugLabel ?? 'Condition';
    if (logicGate.debug) {
      console.log(debugLabel, 'Test', logicGate);
    }
    /**
     * @var conditions Array of key value pairs where the key is the condition
     * and the value is either true or the condition <code>true</code> means
     * the condition tested true, otherwise the condition is returned as the value.
     */
    const conditions: [Condition, true | Condition][] =
      logicGate.conditions.map((condition) => [
        condition,
        ConditionService.testCondition(condition, context),
      ]);

    if (logicGate.debug) {
      console.log(debugLabel, 'Values', conditions);
    }

    switch (logicGate.type) {
      case BooleanLogicTypeEnum.AND: {
        return this._testAnd(logicGate as AndConditionDto, conditions);
      }
      case BooleanLogicTypeEnum.OR: {
        return this._testOr(logicGate as OrConditionDto, conditions);
      }
      case BooleanLogicTypeEnum.NAND: {
        return this._testNAnd(logicGate as NandConditionDto, conditions);
      }
      case BooleanLogicTypeEnum.NOR: {
        return this._testNor(logicGate as NorConditionDto, conditions);
      }
      case BooleanLogicTypeEnum.XOR: {
        return this._testXOr(logicGate as XorConditionDto, conditions);
      }
      default:
        if (logicGate.debug) {
          console.log(
            debugLabel,
            'Logic gate type not implemented',
            logicGate.type,
          );
        }
        return logicGate;
    }
  }
  _testAnd(
    condition: AndConditionDto,
    conditions: [Condition, true | Condition][],
  ): true | Condition {
    const debugLabel = condition.debugLabel ?? 'Condition';
    const firstFalse = conditions.find((c) => c[1] !== true);
    if (condition.debug) {
      console.log(debugLabel, 'First false', firstFalse);
    }
    return firstFalse == null ? true : firstFalse[1];
  }
  _testNAnd(
    condition: NandConditionDto,
    conditions: [Condition, true | Condition][],
  ): true | Condition {
    const debugLabel = condition.debugLabel ?? 'Condition';
    const firstFalse = conditions.find((c) => c[1] !== true);
    if (condition.debug) {
      console.log(debugLabel, 'First false', firstFalse);
    }
    return firstFalse != null ? true : condition;
  }
  _testNor(
    condition: NorConditionDto,
    conditions: [Condition, true | Condition][],
  ): true | Condition {
    const debugLabel = condition.debugLabel ?? 'Condition';
    const firstTrue = conditions.find((c) => c[1] === true);
    if (condition.debug) {
      console.log(debugLabel, 'First true', firstTrue);
    }
    return firstTrue == null ? true : firstTrue[0];
  }
  _testOr(
    condition: OrConditionDto,
    conditions: [Condition, true | Condition][],
  ): true | Condition {
    const debugLabel = condition.debugLabel ?? 'Condition';
    const firstTrue = conditions.find((c) => c[1] === true);
    if (condition.debug) {
      console.log(debugLabel, 'First true', firstTrue);
    }
    return firstTrue != null ? true : condition;
  }
  _testXOr(
    condition: XorConditionDto,
    conditions: [Condition, true | Condition][],
  ): true | Condition {
    const debugLabel = condition.debugLabel ?? 'Condition';
    if (conditions.length === 0) {
      if (condition.debug) {
        console.log(debugLabel, 'No conditions', condition);
      }
      return condition;
    }
    const trueConditions = conditions.filter((c) => c[1] === true);
    const falseConditions = conditions.filter((c) => c[1] !== true);
    const lengthsMatch = trueConditions.length === falseConditions.length;
    if (condition.debug) {
      console.log(debugLabel, 'True/False counts match:', lengthsMatch);
    }
    return lengthsMatch ? true : condition;
  }
})();
