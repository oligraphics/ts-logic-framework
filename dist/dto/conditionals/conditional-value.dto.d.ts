import { Condition } from '../../interfaces/condition.interface';
import { DynamicValue } from '../../interfaces/dynamic-value.interface';
export type ConditionalValueDto = {
    debug?: boolean;
    debugLabel?: string;
    if: Condition;
    true: DynamicValue;
    false: DynamicValue;
};
//# sourceMappingURL=conditional-value.dto.d.ts.map