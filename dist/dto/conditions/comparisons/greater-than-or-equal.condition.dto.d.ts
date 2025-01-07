import { ConditionDto } from '../condition.dto';
import { BooleanLogicTypeEnum } from '../../../enums/boolean-logic-type.enum';
import { Computable } from '../../../interfaces/computable.interface';
export type GreaterThanOrEqualConditionDto = {
    type: BooleanLogicTypeEnum.GREATER_THAN_OR_EQUAL;
    value: Computable<unknown>;
    greaterThanOrEqual: Computable<unknown>;
} & ConditionDto;
//# sourceMappingURL=greater-than-or-equal.condition.dto.d.ts.map