import { ComputableValue } from '../../interfaces/computable-value.interface';
import { Condition } from '../../interfaces/condition.interface';
import { Computable } from '../../interfaces/computable.interface';
import { SelectionTypeEnum } from '../../enums/selection-type.enum';

/**
 * Select a sub set of a collection
 */
export type SelectionDto = {
  select: {
    /**
     * @default SelectionTypeEnum.DEFAULT
     */
    type?: SelectionTypeEnum;
    from: ComputableValue;
    /**
     * @default true
     */
    where?: Condition;
    /**
     * @default undefined
     * @deprecated Not yet implemented
     */
    groupBy?: Computable<unknown>;
    /**
     * @default undefined
     * @deprecated Not yet implemented
     */
    orderBy?: Computable<unknown>;
    /**
     * @default 0
     */
    limit?: Computable<number>;
    /**
     * @default 0
     */
    offset?: Computable<number>;
    /**
     * @default "{value}"
     */
    map?: ComputableValue;
    /**
     * @default false
     */
    debug?: boolean;
  };
};
