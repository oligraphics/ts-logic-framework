import { ConditionalValueDto } from '../dto/conditionals/conditional-value.dto';
import { DynamicContext } from '../interfaces/dynamic-context.interface';
import { ConditionService } from './condition.service';
import { LogicService } from './logic.service';
import { Condition } from '../interfaces/condition.interface';

export const ConditionalValuesService = new (class ConditionalValuesService {
  resolve(
    value: ConditionalValueDto,
    context: DynamicContext,
    debug?: boolean,
  ): any {
    const conditionResult: true | Condition = ConditionService.testCondition(
      value.if,
      context,
      debug,
    );
    if (value.debug || debug) {
      const label = value.debugLabel ?? 'Condition';
      console.debug(`${label}: ${JSON.stringify(conditionResult)}`);
    }
    return LogicService.resolve(
      conditionResult === true
        ? value.true !== undefined
          ? value.true
          : true
        : value.false !== undefined
        ? value.false
        : false,
      context,
      debug,
    );
  }
})();
