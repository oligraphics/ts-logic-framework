import { ConditionDto } from '../condition.dto.ts';
import { DynamicValue } from '../../../interfaces/dynamic-value.interface.ts';

export type EqualConditionDto = {
  value: DynamicValue;
  equals: DynamicValue;
} & ConditionDto;
