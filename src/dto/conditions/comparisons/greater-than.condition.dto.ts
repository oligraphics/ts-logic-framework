import { DynamicValue } from '../../../interfaces/dynamic-value.interface';
import { ConditionDto } from '../condition.dto';

export type GreaterThanConditionDto = {
  value: DynamicValue;
  greaterThan: DynamicValue;
} & ConditionDto;
