import { DynamicValue } from '../../../interfaces/dynamic-value.interface.ts';
import { ConditionDto } from '../condition.dto.ts';

export type LessThanConditionDto = {
  value: DynamicValue;
  lessThan: DynamicValue;
} & ConditionDto;
