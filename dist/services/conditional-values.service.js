"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionalValuesService = void 0;
const condition_service_1 = require("./condition.service");
const logic_service_1 = require("./logic.service");
exports.ConditionalValuesService = new (class ConditionalValuesService {
    resolve(value, context) {
        const conditionResult = condition_service_1.ConditionService.testCondition(value.if, context);
        if (value.debug) {
            const label = value.debugLabel ?? 'Condition';
            console.log(`${label}: ${JSON.stringify(conditionResult)}`);
        }
        return logic_service_1.LogicService.resolve(conditionResult === true ? value.true : value.false, context);
    }
})();
//# sourceMappingURL=conditional-values.service.js.map