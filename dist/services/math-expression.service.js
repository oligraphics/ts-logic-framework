import { MathOperationService } from './math-operation.service.js';
import { OperationEnum } from '../enums/operation.enum';
import { LogicService } from './logic.service';
export const MathExpressionService = new (class MathExpressionService {
    _operators = new Map([
        [OperationEnum.ADD, '+'],
        [OperationEnum.SUBTRACT, '-'],
        [OperationEnum.MULTIPLY, '*'],
        [OperationEnum.DIVIDE, '/'],
        [OperationEnum.POW, '**'],
    ]);
    resolve(expression, context) {
        if ('number' === typeof expression) {
            return expression;
        }
        if ('string' === typeof expression) {
            return context[expression] ?? 0;
        }
        const a = LogicService.resolve(expression.a, context);
        const b = LogicService.resolve(expression.b, context);
        const result = expression?.result;
        return MathOperationService.run(expression.operation, a, b, expression.debug, expression.debugLabel ?? `#${result ?? 'value'}`);
    }
    /**
     * Parses an expression naively. Important: This does not support nesting with
     * () and all multiplications are prioritized over divisions
     * @param input
     */
    parse(input) {
        const trimmed = input.includes(' ') ? input.split(' ').join('') : input;
        for (const [operation, operator] of this._operators.entries()) {
            if (trimmed.includes(operator)) {
                const parts = trimmed.split(operator);
                return this._parseExpression(operation, operator, parts);
            }
        }
        const value = parseFloat(trimmed);
        return !isNaN(value) ? value : trimmed;
    }
    _parseExpression(operation, operator, parts) {
        const a = parts[0];
        const b = parts.slice(1).join(operator);
        return {
            operation: operation,
            a: this.parse(a),
            b: this.parse(b),
        };
    }
})();
//# sourceMappingURL=math-expression.service.js.map