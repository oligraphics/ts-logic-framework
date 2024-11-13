import { ConditionalValueDto } from '../dto/conditionals/conditional-value.dto';
import { DynamicContext } from '../interfaces/dynamic-context.interface';
import { ConditionService } from './condition.service';
import { LogicService } from './logic.service';

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
