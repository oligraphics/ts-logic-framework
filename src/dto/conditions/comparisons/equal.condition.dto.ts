import { ConditionDto } from '../condition.dto';
import { DynamicValue } from '../../../interfaces/dynamic-value.interface';

export type EqualConditionDto = {
  value: DynamicValue;
  equals: DynamicValue;
} & ConditionDto;
