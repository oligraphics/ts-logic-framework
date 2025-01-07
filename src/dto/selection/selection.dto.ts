import { ComputableValue } from '../../interfaces/computable-value.interface';
import { Condition } from '../../interfaces/condition.interface';
import { Computable } from '../../interfaces/computable.interface';

export type SelectionDto = {
  select: {
    from: ComputableValue;
    where?: Condition;
    groupBy?: Computable<unknown>;
    orderBy?: Computable<unknown>;
    limit?: Computable<number>;
    offset?: Computable<number>;
    debug?: boolean;
  };
};
