import { ConditionDto } from '../condition.dto';
import { BooleanLogicTypeEnum } from '../../../enums/boolean-logic-type.enum';
import { Computable } from '../../../interfaces/computable.interface';
export type PatternConditionDto = {
    type: BooleanLogicTypeEnum.PATTERN;
    value: Computable<unknown>;
    pattern: Computable<string>;
    flags?: string;
} & ConditionDto;
//# sourceMappingURL=pattern.condition.dto.d.ts.map