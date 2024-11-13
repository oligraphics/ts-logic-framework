import { DynamicValue } from '../../../interfaces/dynamic-value.interface';
import { ConditionDto } from '../condition.dto';

export type GreaterThanOrEqualConditionDto = {
  value: DynamicValue;
  greaterThanOrEqual: DynamicValue;
} & ConditionDto;
