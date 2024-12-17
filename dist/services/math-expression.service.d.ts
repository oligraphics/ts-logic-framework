import { MathExpressionDto } from '../dto/expressions/math-expression.dto';
import { DynamicContext } from '../interfaces/dynamic-context.interface';
import { DynamicValue } from '../interfaces/dynamic-value.interface';
export declare const MathExpressionService: {
    resolve(expression: MathExpressionDto | number | string, context: DynamicContext): number;
    /**
     * Parses an expression naively. Important: This does not support nesting with
     * () and all multiplications are prioritized over divisions
     * @param input
     */
    parse(input: string): DynamicValue;
    stringify(input: DynamicValue, wrap?: boolean): string;
    _resolve(input: unknown, placeholders: Map<string, DynamicValue>): DynamicValue;
    _parseFunction(name: string, args: string[]): MathExpressionDto;
    _parseOperator(a: string, operator: string, b: string): MathExpressionDto;
};
//# sourceMappingURL=math-expression.service.d.ts.map