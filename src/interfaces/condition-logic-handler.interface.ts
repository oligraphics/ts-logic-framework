import { ConditionDto } from '../dto/conditions/condition.dto';
import { BooleanLogicTypeEnum } from '../enums/boolean-logic-type.enum';
import {DynamicContext} from "./dynamic-context.interface.ts";

export interface ConditionLogicHandlerInterface {
  canTest(type: BooleanLogicTypeEnum): boolean;

  testLogic(
    context: DynamicContext,
    logic: ConditionDto,
    handler: ConditionLogicHandlerInterface,
  ): true | ConditionDto;
}
