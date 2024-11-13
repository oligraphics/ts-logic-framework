import { DynamicValue } from '../../../interfaces/dynamic-value.interface';
import { ConditionDto } from '../condition.dto';

export type LessThanOrEqualConditionDto = {
  value: DynamicValue;
  lessThanOrEqual: DynamicValue;
} & ConditionDto;
