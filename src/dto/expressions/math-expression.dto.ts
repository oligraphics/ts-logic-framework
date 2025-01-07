import { OperationEnum } from '../../enums/operation.enum';
import { Computable } from '../../interfaces/computable.interface';

export type MathExpressionDto = {
  debug?: boolean;
  debugLabel?: string;
  operation: OperationEnum;
  a: Computable<number>;
  b: Computable<number>;
};
