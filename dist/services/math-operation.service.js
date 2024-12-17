"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathOperationService = void 0;
const operation_enum_js_1 = require("../enums/operation.enum.js");
exports.MathOperationService = new (class MathOperationService {
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
                return '^';
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