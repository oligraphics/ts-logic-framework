import { ConditionDto } from '../condition.dto';
import { BooleanLogicTypeEnum } from '../../../enums/boolean-logic-type.enum';
import { Computable } from '../../../interfaces/computable.interface';

export type LessThanOrEqualConditionDto = {
  type: BooleanLogicTypeEnum.LESS_THAN_OR_EQUAL;
  value: Computable<unknown>;
  lessThanOrEqual: Computable<unknown>;
} & ConditionDto;
