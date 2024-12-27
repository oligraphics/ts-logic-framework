import { MathExpressionDto } from '../dto/expressions/math-expression.dto';
import { OperationEnum } from '../enums/operation.enum';
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
    /**
     * Turn the expression into mathematical notation
     * @param input The input expression
     * @param wrap Whether to wrap the result in round brackets if it is an expression (default: <code>() => false</code>)
     */
    stringify(input: DynamicValue, wrap?: (value: DynamicValue) => boolean): string;
    requireWrapping(outerOperation: OperationEnum, value: DynamicValue): boolean;
    _resolve(input: unknown, placeholders: Map<string, DynamicValue>): DynamicValue;
    _parseFunction(name: string, args: string[]): MathExpressionDto;
    _parseOperator(a: string, operator: string, b: string): MathExpressionDto;
};
//# sourceMappingURL=math-expression.service.d.ts.map