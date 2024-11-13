import { ConditionDto } from '../condition.dto';
import { Condition } from '../../../interfaces/condition.interface';

export type LogicGateDto = {
  conditions: Condition[];
} & ConditionDto;
