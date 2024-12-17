"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathOperationService = void 0;
const operation_enum_js_1 = require("../enums/operation.enum.js");
exports.MathOperationService = new (class MathOperationService {
    parse(input) {
        switch (input) {
            case '+':
                return operation_enum_js_1.OperationEnum.ADD;
            case '-':
                return operation_enum_js_1.OperationEnum.SUBTRACT;
            case '*':
                return operation_enum_js_1.OperationEnum.MULTIPLY;
            case '/':
                return operation_enum_js_1.OperationEnum.DIVIDE;
            default:
                throw new Error('Invalid operator ' + input);
        }
    }
    stringify(operation) {
        switch (operation) {
            case operation_enum_js_1.OperationEnum.ADD:
                return '+';
            case operation_enum_js_1.OperationEnum.SUBTRACT:
                return '-';
            case operation_enum_js_1.OperationEnum.MULTIPLY:
                return '*';
            case operation_enum_js_1.OperationEnum.DIVIDE:
                return '/';
            default:
                throw new Error('Operator should be stringified as a function instead.');
        }
    }
    run(operation, a, b, debug = false, debugLabel = undefined) {
        switch (operation) {
            case operation_enum_js_1.OperationEnum.ADD: {
                if (debug) {
                    console.log(debugLabel, a, '+', b, '=', a + b);
                }
                return a + b;
            }
            case operation_enum_js_1.OperationEnum.DIVIDE: {
                if (debug) {
                    console.log(debugLabel, a, '/', b, '=', a / b);
                }
                return a / b;
            }
            case operation_enum_js_1.OperationEnum.MULTIPLY: {
                if (debug) {
                    console.log(debugLabel, a, '*', b, '=', a * b);
                }
                return a * b;
            }
            case operation_enum_js_1.OperationEnum.POW: {
                if (debug) {
                    console.log(debugLabel, a, '^', b, '=', Math.pow(a, b));
                }
                return a ** b;
            }
            case operation_enum_js_1.OperationEnum.SUBTRACT: {
                if (debug) {
                    console.log(debugLabel, a, '-', b, '=', a - b);
                }
                return a - b;
            }
            default: {
                throw new Error(`${debugLabel}: Operation ${operation} is not supported`);
            }
        }
    }
})();
//# sourceMappingURL=math-operation.service.js.map