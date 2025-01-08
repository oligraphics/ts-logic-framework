"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionService = void 0;
const boolean_logic_type_enum_1 = require("../enums/boolean-logic-type.enum");
const logic_service_1 = require("./logic.service");
const logic_gate_service_1 = require("./logic-gate.service");
const equality_service_1 = require("./equality.service");
const likeness_service_1 = require("./likeness.service");
exports.ConditionService = new (class ConditionService {
    comparisons = [
        boolean_logic_type_enum_1.BooleanLogicTypeEnum.EQUAL,
        boolean_logic_type_enum_1.BooleanLogicTypeEnum.GREATER_THAN,
        boolean_logic_type_enum_1.BooleanLogicTypeEnum.GREATER_THAN_OR_EQUAL,
        boolean_logic_type_enum_1.BooleanLogicTypeEnum.LESS_THAN,
        boolean_logic_type_enum_1.BooleanLogicTypeEnum.LESS_THAN_OR_EQUAL,
        boolean_logic_type_enum_1.BooleanLogicTypeEnum.LIKE,
        boolean_logic_type_enum_1.BooleanLogicTypeEnum.PATTERN,
    ];
    /**
     * @returns <code>true</code> if the result of the test is true, otherwise
     * returns the condition that failed.
     */
    testCondition(condition, context, debug) {
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
            const parsed = logic_service_1.LogicService.resolve(condition, context, debug);
            if (typeof parsed === 'string' && parsed === condition) {
                if (debug) {
                    console.error('Condition does not return a boolean', condition);
                }
                return parsed;
            }
            return this.testCondition(parsed, context, debug);
        }
        // Condition Logic
        const logic = condition;
        if (!logic.type) {
            if (debug) {
                console.error('Invalid condition logic without a type:', condition);
                return logic;
            }
        }
        if (logic.type === boolean_logic_type_enum_1.BooleanLogicTypeEnum.NONE) {
            if (debug) {
                console.debug('Empty condition, result is', logic.invert);
            }
            return logic.invert ? true : logic;
        }
        if (!Object.values(boolean_logic_type_enum_1.BooleanLogicTypeEnum).includes(logic.type)) {
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
        const logicGateResult = logic_gate_service_1.LogicGateService.test(logic, context, debug);
        if (logic.invert) {
            return logicGateResult === true ? logicGateResult : true;
        }
        else {
            return logicGateResult === true ? true : logicGateResult;
        }
    }
    testComparison(logic, context, debug) {
        const invert = logic.invert === true;
        const debugLabel = logic.debug || debug
            ? (logic.debugLabel ?? 'Test') + (invert ? ' (invert)' : '')
            : undefined;
        switch (logic.type) {
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.EQUAL: {
                const valueLogic = logic;
                const value = logic_service_1.LogicService.resolve(valueLogic.value, context, logic.debug || debug);
                const equals = logic_service_1.LogicService.resolve(valueLogic.equals, context, logic.debug || debug);
                const result = equality_service_1.EqualityService.test(value, equals);
                if (logic.debug || debug) {
                    console.debug(debugLabel, value, 'equals', equals, '=', result);
                }
                return result !== invert ? true : logic;
            }
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.LIKE: {
                const valueLogic = logic;
                const value = logic_service_1.LogicService.resolve(valueLogic.value, context, logic.debug || debug);
                const equals = logic_service_1.LogicService.resolve(valueLogic.equals, context, logic.debug || debug);
                const result = likeness_service_1.LikenessService.test(value, equals);
                if (logic.debug || debug) {
                    console.debug(debugLabel, value, 'like', equals, '=', result);
                }
                return result !== invert ? true : logic;
            }
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.GREATER_THAN: {
                const valueLogic = logic;
                const input = logic_service_1.LogicService.resolve(valueLogic.value, context, logic.debug || debug) ?? 0;
                const value = logic_service_1.LogicService.resolve(valueLogic.greaterThan, context, logic.debug || debug) ?? 0;
                const result = input > value;
                if (logic.debug || debug) {
                    console.debug(debugLabel, input, '>', value, '=', result);
                }
                return result !== invert ? true : logic;
            }
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.GREATER_THAN_OR_EQUAL: {
                const valueLogic = logic;
                const input = logic_service_1.LogicService.resolve(valueLogic.value, context, logic.debug || debug) ?? 0;
                const value = logic_service_1.LogicService.resolve(valueLogic.greaterThanOrEqual, context, logic.debug || debug) ?? 0;
                const result = input >= value;
                if (logic.debug || debug) {
                    console.debug(debugLabel, input, '>=', value, '=', result);
                }
                return result !== invert ? true : logic;
            }
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.LESS_THAN_OR_EQUAL: {
                const valueLogic = logic;
                const input = logic_service_1.LogicService.resolve(valueLogic.value, context, logic.debug || debug) ?? 0;
                const value = logic_service_1.LogicService.resolve(valueLogic.lessThanOrEqual, context, logic.debug || debug) ?? 0;
                const result = input <= value;
                if (logic.debug || debug) {
                    console.debug(debugLabel, input, '<=', value, '=', result);
                }
                return result !== invert ? true : logic;
            }
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.LESS_THAN: {
                const valueLogic = logic;
                const input = logic_service_1.LogicService.resolve(valueLogic.value, context, logic.debug || debug) ?? 0;
                const value = logic_service_1.LogicService.resolve(valueLogic.lessThan, context, logic.debug || debug) ?? 0;
                const result = input < value;
                if (logic.debug || debug) {
                    console.debug(debugLabel, input, '<', value, '=', result);
                }
                return result !== invert ? true : logic;
            }
            case boolean_logic_type_enum_1.BooleanLogicTypeEnum.PATTERN: {
                const valueLogic = logic;
                const input = logic_service_1.LogicService.resolve(valueLogic.value, context, logic.debug || debug);
                const pattern = logic_service_1.LogicService.resolve(valueLogic.pattern, context, logic.debug || debug);
                const flags = valueLogic.flags ?? 'g';
                if (pattern === undefined) {
                    if (logic.debug || debug) {
                        console.warn('Condition does not provide a regular expression', logic);
                    }
                    return logic;
                }
                const result = input ? new RegExp(pattern, flags).test(input) : false;
                if (logic.debug || debug) {
                    console.debug(debugLabel, input, ' matches ', `/${pattern}/${flags}`, '=', result);
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