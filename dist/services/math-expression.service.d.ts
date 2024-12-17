import { MathExpressionDto } from '../dto/expressions/math-expression.dto';
import { OperationEnum } from '../enums/operation.enum';
import { DynamicContext } from '../interfaces/dynamic-context.interface';
import { DynamicValue } from '../interfaces/dynamic-value.interface';
export declare const MathExpressionService: {
    _operators: Map<OperationEnum, string>;
    resolve(expression: MathExpressionDto | number | string, context: DynamicContext): number;
    /**
     * Parses an expression naively. Important: This does not support nesting with
     * () and all multiplications are prioritized over divisions
     * @param input
     */
    parse(input: string): MathExpressionDto | number | string;
    stringify(input: DynamicValue, wrap?: boolean): string;
    _parseExpression(operation: OperationEnum, operator: string, parts: string[]): MathExpressionDto;
};
//# sourceMappingURL=math-expression.service.d.ts.map