import { LogicGateDto } from './logic-gate.dto';
import { BooleanLogicTypeEnum } from '../../../enums/boolean-logic-type.enum';

export type OrConditionDto = {
  type: BooleanLogicTypeEnum.OR;
} & LogicGateDto;
