"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionService = void 0;
const boolean_logic_type_enum_1 = require("../enums/boolean-logic-type.enum");
const logic_service_1 = require("./logic.service");
const logic_gate_service_1 = require("./logic-gate.service");
const equality_service_1 = require("./equality.service");
exports.ConditionService = new (class ConditionService {
    comparisons = [
        boolean_logic_type_enum_1.BooleanLogicTypeEnum.EQUAL,
        boolean_logic_type_enum_1.BooleanLogicTypeEnum.GREATER_THAN,
        boolean_logic_type_enum_1.BooleanLogicTypeEnum.GREATER_THAN_OR_EQUAL,
        boolean_logic_type_enum_1.BooleanLogicTypeEnum.LESS_THAN,
        boolean_logic_type_enum_1.BooleanLogicTypeEnum.LESS_THAN_OR_EQUAL,
    ];
    /**
     * @returns <code>true</code> if the result of the test is true, otherwise
     * returns the condition that failed.
     */
    testCondition(condition, context) {
        if (typeof condition === 'string') {
            const parsed = logic_service_1.LogicService.resolve(condition, context);
            if (typeof parsed === 'string' && parsed === condition) {
                return parsed;
            }
            return this.testCondition(parsed, context);
        }
        if (typeof condition === 'boolean') {
            return condition ? true : condition;
        }
        if (typeof condition === 'number') {
            return condition >= 1 ? true : condition;
        }
        const logic = condition;
        if (logic.type === boolean_logic_type_enum_1.BooleanLogicTypeEnum.NONE) {
            return logic.invert ? true : logic;
        }
        if (!Object.values(boolean_logic_type_enum_1.BooleanLogicTypeEnum).includes(logic.type)) {
            console.warn('Unknown logic type ' + logic.type);
            return logic;
        }
        if (this.comparisons.includes(logic.type)) {
            return this.testComparison(condition, context);
        }
        const logicGateResult = logic_gate_service_1.LogicGateService.test(logic, context);
        if (logic.invert) {
            return logicGateResult === true ? logicGateResult : true;
        }
        else {
            return logicGateResult === true ? true : logicGateResult;
        }
    }
    testComparison(logic, context) {
        const invert = logic.invert === true;
        const debugLabel = logic.debug
            ? (logic.debugLabel ?? 'Test') + (invert ? ' (invert)' : '')
            : undefined;
        switch (logic.type) {
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.EQUAL: {
                const valueLogic = logic;
                const value = logic_service_1.LogicService.resolve(valueLogic.value, context, logic.debug);
                const equals = logic_service_1.LogicService.resolve(valueLogic.equals, context, logic.debug);
                const result = equality_service_1.EqualityService.test(value, equals);
                if (logic.debug) {
                    console.log(debugLabel, JSON.stringify(value), Array.isArray(equals) ? 'in' : '=', JSON.stringify(equals), '=', result);
                }
                return result !== invert ? true : logic;
            }
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.GREATER_THAN: {
                const valueLogic = logic;
                const input = logic_service_1.LogicService.resolve(valueLogic.value, context, logic.debug);
                const value = logic_service_1.LogicService.resolve(valueLogic.greaterThan, context, logic.debug);
                const result = input > value;
                if (logic.debug) {
                    console.log(debugLabel, JSON.stringify(input), '>', JSON.stringify(value), '=', result);
                }
                return result !== invert ? true : logic;
            }
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.GREATER_THAN_OR_EQUAL: {
                const valueLogic = logic;
                const input = logic_service_1.LogicService.resolve(valueLogic.value, context, logic.debug);
                const value = logic_service_1.LogicService.resolve(valueLogic.greaterThanOrEqual, context, logic.debug);
                const result = input >= value;
                if (logic.debug) {
                    console.log(debugLabel, JSON.stringify(input), '>=', JSON.stringify(value), '=', result);
                }
                return result !== invert ? true : logic;
            }
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.LESS_THAN_OR_EQUAL: {
                const valueLogic = logic;
                const input = logic_service_1.LogicService.resolve(valueLogic.value, context, logic.debug);
                const value = logic_service_1.LogicService.resolve(valueLogic.lessThanOrEqual, context, logic.debug);
                const result = input <= value;
                if (logic.debug) {
                    console.log(debugLabel, JSON.stringify(input), '<=', JSON.stringify(value), '=', result);
                }
                return result !== invert ? true : logic;
            }
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.LESS_THAN: {
                const valueLogic = logic;
                const input = logic_service_1.LogicService.resolve(valueLogic.value, context, logic.debug);
                const value = logic_service_1.LogicService.resolve(valueLogic.lessThan, context, logic.debug);
                const result = input < value;
                if (logic.debug) {
                    console.log(debugLabel, JSON.stringify(input), '<', JSON.stringify(value), '=', result);
                }
                return result !== invert ? true : logic;
            }
            default: {
                throw new Error(`Comparison type ${logic.type} is not implemented.`);
            }
        }
    }
})();
//# sourceMappingURL=condition.service.js.map