"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionService = void 0;
const boolean_logic_type_enum_1 = require("../enums/boolean-logic-type.enum");
const logic_service_1 = require("./logic.service");
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
    testCondition(condition, context, handler) {
        if (typeof condition === 'string') {
            const parsed = logic_service_1.LogicService.resolve(condition, context);
            if (typeof parsed === 'string' && parsed === condition) {
                return parsed;
            }
            return this.testCondition(parsed, context, handler);
        }
        if (typeof condition === 'boolean') {
            return condition ? true : condition;
        }
        if (typeof condition === 'number') {
            return condition >= 1 ? true : condition;
        }
        const logic = condition;
        if (handler !== undefined && handler.canTest(logic.type)) {
            return handler.testLogic(context, logic, handler);
        }
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
        const logicGate = logic;
        /**
         * @var conditions Array of key value pairs where the key is the condition
         * and the value is either true or the condition <code>true</code> means
         * the condition tested true, otherwise the condition is returned as the value.
         */
        const conditions = logicGate.conditions.map((condition) => [
            condition,
            this.testCondition(condition, context, handler),
        ]);
        switch (logic.type) {
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.AND:
                const firstFalse = conditions.find((c) => c[1] !== true);
                return firstFalse == null ? true : firstFalse[1];
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.OR:
                return conditions.find((c) => c[1] === true) != null ? true : logic;
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.NAND:
                return conditions.find((c) => c[1] !== true) != null ? true : logic;
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.NOR:
                const firstTrue = conditions.find((c) => c[1] === true);
                return firstTrue == null ? true : firstTrue[0];
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.XOR:
                return conditions.length > 0 &&
                    conditions.filter((c) => c[1] === true).length > 0 ===
                        conditions.filter((c) => c[1] !== true).length > 0
                    ? true
                    : logic;
            default:
                return logic;
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
                const input = logic_service_1.LogicService.resolve(valueLogic.value, context);
                const value = logic_service_1.LogicService.resolve(valueLogic.equals, context);
                let result;
                if (Array.isArray(value)) {
                    if (Array.isArray(input)) {
                        // All elements in value must be included in input
                        result = value.find((v) => !input.includes(v)) === null;
                    }
                    else {
                        // Value must include the input
                        result = value.includes(input);
                    }
                }
                else if (Array.isArray(input)) {
                    // Input must include the value
                    result = input.includes(value);
                }
                else {
                    // Input must equal value
                    result = input === value;
                }
                if (logic.debug) {
                    console.log(debugLabel, JSON.stringify(input), Array.isArray(value) ? 'in' : '=', JSON.stringify(value), '=', result);
                }
                return result !== invert ? true : logic;
            }
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.GREATER_THAN: {
                const valueLogic = logic;
                const input = logic_service_1.LogicService.resolve(valueLogic.value, context);
                const value = logic_service_1.LogicService.resolve(valueLogic.greaterThan, context);
                const result = input > value;
                if (logic.debug) {
                    console.log(debugLabel, JSON.stringify(input), '>', JSON.stringify(value), '=', result);
                }
                return result !== invert ? true : logic;
            }
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.GREATER_THAN_OR_EQUAL: {
                const valueLogic = logic;
                const input = logic_service_1.LogicService.resolve(valueLogic.value, context);
                const value = logic_service_1.LogicService.resolve(valueLogic.greaterThanOrEqual, context);
                const result = input >= value;
                if (logic.debug) {
                    console.log(debugLabel, JSON.stringify(input), '>=', JSON.stringify(value), '=', result);
                }
                return result !== invert ? true : logic;
            }
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.LESS_THAN_OR_EQUAL: {
                const valueLogic = logic;
                const input = logic_service_1.LogicService.resolve(valueLogic.value, context);
                const value = logic_service_1.LogicService.resolve(valueLogic.lessThanOrEqual, context);
                const result = input <= value;
                if (logic.debug) {
                    console.log(debugLabel, JSON.stringify(input), '<=', JSON.stringify(value), '=', result);
                }
                return result !== invert ? true : logic;
            }
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.LESS_THAN: {
                const valueLogic = logic;
                const input = logic_service_1.LogicService.resolve(valueLogic.value, context);
                const value = logic_service_1.LogicService.resolve(valueLogic.lessThan, context);
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