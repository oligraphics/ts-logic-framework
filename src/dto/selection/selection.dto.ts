import { DynamicValue } from '../../interfaces/dynamic-value.interface';

export type SelectionDto = {
  select: {
    from: DynamicValue;
    where?: DynamicValue;
    groupBy?: DynamicValue;
    orderBy?: DynamicValue;
    limit?: DynamicValue;
    offset?: DynamicValue;
    debug?: boolean;
  };
};
