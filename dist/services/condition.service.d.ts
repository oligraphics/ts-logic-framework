import { Condition } from '../interfaces/condition.interface';
import { DynamicContext } from '../interfaces/dynamic-context.interface';
import { ConditionDto } from '../dto/conditions/condition.dto';
import { BooleanLogicTypeEnum } from '../enums/boolean-logic-type.enum';
export declare const ConditionService: {
    comparisons: BooleanLogicTypeEnum[];
    /**
     * @returns <code>true</code> if the result of the test is true, otherwise
     * returns the condition that failed.
     */
    testCondition(condition: Condition, context: DynamicContext, debug?: boolean): true | Condition;
    testComparison(logic: ConditionDto, context: DynamicContext, debug?: boolean): true | Condition;
};
//# sourceMappingURL=condition.service.d.ts.map