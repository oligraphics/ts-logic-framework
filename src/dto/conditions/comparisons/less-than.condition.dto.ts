import { DynamicValue } from '../../../interfaces/dynamic-value.interface';
import { ConditionDto } from '../condition.dto';

export type LessThanConditionDto = {
  value: DynamicValue;
  lessThan: DynamicValue;
} & ConditionDto;
