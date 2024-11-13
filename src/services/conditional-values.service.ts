import { ConditionalValueDto } from '../dto/conditionals/conditional-value.dto.ts';
import { DynamicContext } from '../interfaces/dynamic-context.interface.ts';
import { ConditionService } from './condition.service.ts';
import { LogicService } from './logic.service.ts';

export const ConditionalValuesService = new (class ConditionalValuesService {
  resolve(value: ConditionalValueDto, context: DynamicContext): any {
    const conditionResult = ConditionService.testCondition(value.if, context);
    if (value.debug) {
      const label = value.debugLabel ?? 'Condition';
      console.log(`${label}: ${conditionResult}`);
    }
    return LogicService.resolve(
      conditionResult ? value.true : value.false,
      context,
    );
  }
})();
