import { DynamicValue } from '../../../interfaces/dynamic-value.interface.ts';
import { ConditionDto } from '../condition.dto.ts';

export type LessThanOrEqualConditionDto = {
  value: DynamicValue;
  lessThanOrEqual: DynamicValue;
} & ConditionDto;
