import { Condition } from '../../interfaces/condition.interface.ts';
import { DynamicValue } from '../../interfaces/dynamic-value.interface.ts';

export type ConditionalValueDto = {
  debug?: boolean;
  debugLabel?: string;
  if: Condition;
  true: DynamicValue;
  false: DynamicValue;
};
