import { DynamicValue } from '../../../interfaces/dynamic-value.interface';
import { ConditionDto } from '../condition.dto';
import { BooleanLogicTypeEnum } from '../../../enums/boolean-logic-type.enum';

export type LessThanOrEqualConditionDto = {
  type: BooleanLogicTypeEnum.LESS_THAN_OR_EQUAL;
  value: DynamicValue;
  lessThanOrEqual: DynamicValue;
} & ConditionDto;
