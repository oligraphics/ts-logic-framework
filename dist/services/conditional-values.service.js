"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionalValuesService = void 0;
const condition_service_1 = require("./condition.service");
const logic_service_1 = require("./logic.service");
exports.ConditionalValuesService = new (class ConditionalValuesService {
    resolve(value, context, debug) {
        const conditionResult = condition_service_1.ConditionService.testCondition(value.if, context, debug);
        if (value.debug || debug) {
            const label = value.debugLabel ?? 'Condition';
            console.debug(`${label}:`, conditionResult);
        }
        return logic_service_1.LogicService.resolve(conditionResult === true
            ? value.true !== undefined
                ? value.true
                : true
            : value.false !== undefined
                ? value.false
                : false, context, debug);
    }
})();
//# sourceMappingURL=conditional-values.service.js.map