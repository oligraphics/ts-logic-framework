import { MathExpressionDto } from '../dto/expressions/math-expression.dto';
import { ConditionalValueDto } from '../dto/conditionals/conditional-value.dto';

export type DynamicValue =
  | DynamicValue[]
  | MathExpressionDto
  | ConditionalValueDto
  | object
  | string
  | number
  | boolean
  | null;
