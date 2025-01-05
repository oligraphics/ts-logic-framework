import { DynamicValue } from '../../../interfaces/dynamic-value.interface';
import { ConditionDto } from '../condition.dto';
import { BooleanLogicTypeEnum } from '../../../enums/boolean-logic-type.enum';
export type GreaterThanOrEqualConditionDto = {
    type: BooleanLogicTypeEnum.GREATER_THAN_OR_EQUAL;
    value: DynamicValue;
    greaterThanOrEqual: DynamicValue;
} & ConditionDto;
//# sourceMappingURL=greater-than-or-equal.condition.dto.d.ts.map