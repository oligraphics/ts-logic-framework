"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathOperationService = void 0;
const operation_enum_js_1 = require("../enums/operation.enum.js");
exports.MathOperationService = new (class MathOperationService {
    getWeight(operation) {
        switch (operation) {
            case operation_enum_js_1.OperationEnum.POW:
            case operation_enum_js_1.OperationEnum.SQRT:
            case operation_enum_js_1.OperationEnum.MOD:
                return 3;
            case operation_enum_js_1.OperationEnum.MULTIPLY:
            case operation_enum_js_1.OperationEnum.DIVIDE:
                return 2;
            case operation_enum_js_1.OperationEnum.ADD:
            case operation_enum_js_1.OperationEnum.SUBTRACT:
                return 1;
            default:
                return 0;
        }
    }
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
            case '**':
                return operation_enum_js_1.OperationEnum.POW;
            case '%':
                return operation_enum_js_1.OperationEnum.MOD;
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
            case operation_enum_js_1.OperationEnum.POW:
                return '**';
            case operation_enum_js_1.OperationEnum.MOD:
                return '%';
            default:
                throw new Error('Operator should be stringified as a function instead.');
        }
    }
    run(operation, a, b, debug = false, debugLabel = undefined) {
        switch (operation) {
            case operation_enum_js_1.OperationEnum.ADD: {
                if (debug) {
                    console.debug(debugLabel, a, '+', b, '=', a + b);
                }
                return a + b;
            }
            case operation_enum_js_1.OperationEnum.DIVIDE: {
                if (debug) {
                    console.debug(debugLabel, a, '/', b, '=', a / b);
                }
                return a / b;
            }
            case operation_enum_js_1.OperationEnum.MULTIPLY: {
                if (debug) {
                    console.debug(debugLabel, a, '*', b, '=', a * b);
                }
                return a * b;
            }
            case operation_enum_js_1.OperationEnum.POW: {
                if (debug) {
                    console.debug(debugLabel, a, '^', b, '=', Math.pow(a, b));
                }
                return a ** b;
            }
            case operation_enum_js_1.OperationEnum.SQRT: {
                if (debug) {
                    console.debug(debugLabel, `sqrt(${a})`, '=', Math.pow(a, b));
                }
                return Math.sqrt(a);
            }
            case operation_enum_js_1.OperationEnum.MOD: {
                if (debug) {
                    console.debug(debugLabel, a, '%', b, '=', a - b);
                }
                return a % b;
            }
            case operation_enum_js_1.OperationEnum.SUBTRACT: {
                if (debug) {
                    console.debug(debugLabel, a, '-', b, '=', a - b);
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