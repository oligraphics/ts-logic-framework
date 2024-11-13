import { DynamicValue } from '../../../interfaces/dynamic-value.interface.ts';
import { ConditionDto } from '../condition.dto.ts';

export type GreaterThanOrEqualConditionDto = {
  value: DynamicValue;
  greaterThanOrEqual: DynamicValue;
} & ConditionDto;
