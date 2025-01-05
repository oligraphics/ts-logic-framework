import { DynamicValue } from '../../../interfaces/dynamic-value.interface';
import { ConditionDto } from '../condition.dto';
import { BooleanLogicTypeEnum } from '../../../enums/boolean-logic-type.enum';
export type GreaterThanConditionDto = {
    type: BooleanLogicTypeEnum.GREATER_THAN;
    value: DynamicValue;
    greaterThan: DynamicValue;
} & ConditionDto;
//# sourceMappingURL=greater-than.condition.dto.d.ts.map