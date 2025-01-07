import { ConditionDto } from '../condition.dto';
import { BooleanLogicTypeEnum } from '../../../enums/boolean-logic-type.enum';
import { Computable } from '../../../interfaces/computable.interface';

export type LessThanConditionDto = {
  type: BooleanLogicTypeEnum.LESS_THAN;
  value: Computable<unknown>;
  lessThan: Computable<unknown>;
} & ConditionDto;
