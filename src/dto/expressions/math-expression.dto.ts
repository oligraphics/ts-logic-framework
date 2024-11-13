import { OperationEnum } from '../../enums/operation.enum';
import { DynamicValue } from '../../interfaces/dynamic-value.interface';

export type MathExpressionDto = {
  debug?: boolean;
  debugLabel?: string;
  operation: OperationEnum;
  a: DynamicValue;
  b: DynamicValue;
};
