import { MathExpressionDto } from '../dto/expressions/math-expression.dto';
import { ConditionalValueDto } from '../dto/conditionals/conditional-value.dto.ts';

export type DynamicValue =
  | DynamicValue[]
  | MathExpressionDto
  | ConditionalValueDto
  | string
  | number
  | boolean
  | null;
