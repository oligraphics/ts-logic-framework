import { ConditionDto } from '../condition.dto';
import { DynamicValue } from '../../../interfaces/dynamic-value.interface';
import { BooleanLogicTypeEnum } from '../../../enums/boolean-logic-type.enum';
export type EqualConditionDto = {
    type: BooleanLogicTypeEnum.AND;
    value: DynamicValue;
    equals: DynamicValue;
} & ConditionDto;
//# sourceMappingURL=equal.condition.dto.d.ts.map