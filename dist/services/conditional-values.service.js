import { ConditionService } from './condition.service';
import { LogicService } from './logic.service';
export const ConditionalValuesService = new (class ConditionalValuesService {
    resolve(value, context) {
        const conditionResult = ConditionService.testCondition(value.if, context);
        if (value.debug) {
            const label = value.debugLabel ?? 'Condition';
            console.log(`${label}: ${conditionResult}`);
        }
        return LogicService.resolve(conditionResult ? value.true : value.false, context);
    }
})();
//# sourceMappingURL=conditional-values.service.js.map