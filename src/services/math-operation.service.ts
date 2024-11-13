import { OperationEnum } from '../enums/operation.enum.js';

export const MathOperationService = new (class MathOperationService {
  run(
    operation: OperationEnum,
    a: number,
    b: number,
    debug = false,
    debugLabel: string | undefined = undefined,
  ): number {
    switch (operation) {
      case OperationEnum.ADD: {
        if (debug) {
          console.log(debugLabel, a, '+', b, '=', a + b);
        }
        return a + b;
      }
      case OperationEnum.DIVIDE: {
        if (debug) {
          console.log(debugLabel, a, '/', b, '=', a / b);
        }
        return a / b;
      }
      case OperationEnum.MULTIPLY: {
        if (debug) {
          console.log(debugLabel, a, '*', b, '=', a * b);
        }
        return a * b;
      }
      case OperationEnum.POW: {
        if (debug) {
          console.log(debugLabel, a, '^', b, '=', Math.pow(a, b));
        }
        return a ** b;
      }
      case OperationEnum.SUBTRACT: {
        if (debug) {
          console.log(debugLabel, a, '-', b, '=', a - b);
        }
        return a - b;
      }
      default: {
        throw new Error(
          `${debugLabel}: Operation ${operation} is not supported`,
        );
      }
    }
  }
})();
