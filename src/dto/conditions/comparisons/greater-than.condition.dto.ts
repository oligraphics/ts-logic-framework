import { ConditionDto } from '../condition.dto';
import { BooleanLogicTypeEnum } from '../../../enums/boolean-logic-type.enum';
import { Computable } from '../../../interfaces/computable.interface';

export type GreaterThanConditionDto = {
  type: BooleanLogicTypeEnum.GREATER_THAN;
  value: Computable<unknown>;
  greaterThan: Computable<unknown>;
} & ConditionDto;
