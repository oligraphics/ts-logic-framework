import { MathExpressionDto } from '../dto/expressions/math-expression.dto';
import { ConditionalValueDto } from '../dto/conditionals/conditional-value.dto';
import { SelectionDto } from '../dto/selection/selection.dto';

export type DynamicValue =
  | DynamicValue[]
  | MathExpressionDto
  | ConditionalValueDto
  | SelectionDto
  | object
  | string
  | number
  | boolean
  | null;
