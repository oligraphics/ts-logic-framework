import { ConditionDto } from '../condition.dto';
import { BooleanLogicTypeEnum } from '../../../enums/boolean-logic-type.enum';
import { Computable } from '../../../interfaces/computable.interface';
export type EqualConditionDto = {
    type: BooleanLogicTypeEnum.AND;
    value: Computable<unknown>;
    equals: Computable<unknown>;
} & ConditionDto;
//# sourceMappingURL=equal.condition.dto.d.ts.map