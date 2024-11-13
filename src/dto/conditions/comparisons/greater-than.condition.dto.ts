import { DynamicValue } from '../../../interfaces/dynamic-value.interface.ts';
import { ConditionDto } from '../condition.dto.ts';

export type GreaterThanConditionDto = {
  value: DynamicValue;
  greaterThan: DynamicValue;
} & ConditionDto;
