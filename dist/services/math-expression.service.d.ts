import { MathExpressionDto } from '../dto/expressions/math-expression.dto';
import { OperationEnum } from '../enums/operation.enum';
import { DynamicContext } from '../interfaces/dynamic-context.interface';
import { ComputableValue } from '../interfaces/computable-value.interface';
export declare const MathExpressionService: {
    resolve(expression: MathExpressionDto | number | string, context: DynamicContext, debug?: boolean): number | undefined;
    /**
     * Parses an expression naively. Important: This does not support nesting with
     * () and all multiplications are prioritized over divisions
     * @param input
     */
    parse(input: string): ComputableValue;
    /**
     * Turn the expression into mathematical notation
     * @param input The input expression
     * @param wrap Whether to wrap the result in round brackets if it is an expression (default: <code>() => false</code>)
     */
    stringify(input: ComputableValue, wrap?: (value: ComputableValue) => boolean): string;
    requireWrapping(outerOperation: OperationEnum, value: ComputableValue, isRightSide: boolean): boolean;
    _resolve(input: unknown, placeholders: Map<string, ComputableValue>): ComputableValue;
    _parseFunction(name: string, args: string[]): MathExpressionDto;
    _parseOperator(a: string, operator: string, b: string): MathExpressionDto;
};
//# sourceMappingURL=math-expression.service.d.ts.map