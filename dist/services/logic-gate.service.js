"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicGateService = void 0;
const boolean_logic_type_enum_1 = require("../enums/boolean-logic-type.enum");
const condition_service_1 = require("./condition.service");
exports.LogicGateService = new (class LogicGateService {
    test(logicGate, context, debug) {
        const debugLabel = logicGate.debugLabel ?? 'Condition';
        if (logicGate.debug || debug) {
            console.debug(debugLabel, 'Test', logicGate);
        }
        /**
         * @var conditions Array of key value pairs where the key is the condition
         * and the value is either true or the condition <code>true</code> means
         * the condition tested true, otherwise the condition is returned as the value.
         */
        const conditions = logicGate.conditions.map((condition) => [
            condition,
            condition_service_1.ConditionService.testCondition(condition, context, debug),
        ]);
        if (logicGate.debug || debug) {
            console.debug(debugLabel, 'Values', conditions);
        }
        switch (logicGate.type) {
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.AND: {
                return this._testAnd(logicGate, conditions, debug);
            }
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.OR: {
                return this._testOr(logicGate, conditions, debug);
            }
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.NAND: {
                return this._testNAnd(logicGate, conditions, debug);
            }
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.NOR: {
                return this._testNor(logicGate, conditions, debug);
            }
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.XOR: {
                return this._testXOr(logicGate, conditions, debug);
            }
            default:
                if (logicGate.debug || debug) {
                    console.log(debugLabel, 'Logic gate type not implemented', logicGate.type);
                }
                return logicGate;
        }
    }
    _testAnd(condition, conditions, debug) {
        const debugLabel = condition.debugLabel ?? 'Condition';
        const firstFalse = conditions.find((c) => c[1] !== true);
        if (condition.debug || debug) {
            console.debug(debugLabel, 'First false', firstFalse);
        }
        return firstFalse == null ? true : firstFalse[1];
    }
    _testNAnd(condition, conditions, debug) {
        const debugLabel = condition.debugLabel ?? 'Condition';
        const firstFalse = conditions.find((c) => c[1] !== true);
        if (condition.debug || debug) {
            console.debug(debugLabel, 'First false', firstFalse);
        }
        return firstFalse != null ? true : condition;
    }
    _testNor(condition, conditions, debug) {
        const debugLabel = condition.debugLabel ?? 'Condition';
        const firstTrue = conditions.find((c) => c[1] === true);
        if (condition.debug || debug) {
            console.debug(debugLabel, 'First true', firstTrue);
        }
        return firstTrue == null ? true : firstTrue[0];
    }
    _testOr(condition, conditions, debug) {
        const debugLabel = condition.debugLabel ?? 'Condition';
        const firstTrue = conditions.find((c) => c[1] === true);
        if (condition.debug || debug) {
            console.debug(debugLabel, 'First true', firstTrue);
        }
        return firstTrue != null ? true : condition;
    }
    _testXOr(condition, conditions, debug) {
        const debugLabel = condition.debugLabel ?? 'Condition';
        if (conditions.length === 0) {
            if (condition.debug || debug) {
                console.debug(debugLabel, 'No conditions', condition);
            }
            return condition;
        }
        const trueConditions = conditions.filter((c) => c[1] === true);
        const falseConditions = conditions.filter((c) => c[1] !== true);
        const lengthsMatch = trueConditions.length === falseConditions.length;
        if (condition.debug || debug) {
            console.debug(debugLabel, 'True/False counts match:', lengthsMatch);
        }
        return lengthsMatch ? true : condition;
    }
})();
//# sourceMappingURL=logic-gate.service.js.map