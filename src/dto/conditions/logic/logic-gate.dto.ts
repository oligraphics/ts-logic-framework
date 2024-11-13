import { ConditionDto } from '../condition.dto.ts';
import { Condition } from '../../../interfaces/condition.interface.ts';

export type LogicGateDto = {
  conditions: Condition[];
} & ConditionDto;
