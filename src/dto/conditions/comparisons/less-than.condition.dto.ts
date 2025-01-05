import { DynamicValue } from '../../../interfaces/dynamic-value.interface';
import { ConditionDto } from '../condition.dto';
import { BooleanLogicTypeEnum } from '../../../enums/boolean-logic-type.enum';

export type LessThanConditionDto = {
  type: BooleanLogicTypeEnum.LESS_THAN;
  value: DynamicValue;
  lessThan: DynamicValue;
} & ConditionDto;
