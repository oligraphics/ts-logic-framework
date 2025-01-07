import { Condition } from '../../interfaces/condition.interface';
import { Computable } from '../../interfaces/computable.interface';
export type ConditionalValueDto = {
    debug?: boolean;
    debugLabel?: string;
    if: Condition;
    true: Computable<unknown>;
    false: Computable<unknown>;
};
//# sourceMappingURL=conditional-value.dto.d.ts.map