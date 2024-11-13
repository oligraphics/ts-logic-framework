"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathExpressionService = void 0;
const math_operation_service_js_1 = require("./math-operation.service.js");
const operation_enum_1 = require("../enums/operation.enum");
const logic_service_1 = require("./logic.service");
exports.MathExpressionService = new (class MathExpressionService {
    _operators = new Map([
        [operation_enum_1.OperationEnum.ADD, '+'],
        [operation_enum_1.OperationEnum.SUBTRACT, '-'],
        [operation_enum_1.OperationEnum.MULTIPLY, '*'],
        [operation_enum_1.OperationEnum.DIVIDE, '/'],
        [operation_enum_1.OperationEnum.POW, '**'],
    ]);
    resolve(expression, context) {
        if ('number' === typeof expression) {
            return expression;
        }
        if ('string' === typeof expression) {
            return context[expression] ?? 0;
        }
        const a = logic_service_1.LogicService.resolve(expression.a, context);
        const b = logic_service_1.LogicService.resolve(expression.b, context);
        const result = expression?.result;
        return math_operation_service_js_1.MathOperationService.run(expression.operation, a, b, expression.debug, expression.debugLabel ?? `#${result ?? 'value'}`);
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