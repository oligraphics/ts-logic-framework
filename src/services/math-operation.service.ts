import { OperationEnum } from '../enums/operation.enum.js';

export const MathOperationService = new (class MathOperationService {
  getWeight(operation: OperationEnum) {
    switch (operation) {
      case OperationEnum.POW:
      case OperationEnum.SQRT:
      case OperationEnum.MOD:
        return 3;
      case OperationEnum.MULTIPLY:
      case OperationEnum.DIVIDE:
        return 2;
      case OperationEnum.ADD:
      case OperationEnum.SUBTRACT:
        return 1;
      default:
        return 0;
    }
  }

  parse(input: string): OperationEnum {
    switch (input) {
      case '+':
        return OperationEnum.ADD;
      case '-':
        return OperationEnum.SUBTRACT;
      case '*':
        return OperationEnum.MULTIPLY;
      case '/':
        return OperationEnum.DIVIDE;
      case '**':
        return OperationEnum.POW;
      case '%':
        return OperationEnum.MOD;
      default:
        throw new Error('Invalid operator ' + input);
    }
  }

  stringify(operation: OperationEnum): string {
    switch (operation) {
      case OperationEnum.ADD:
        return '+';
      case OperationEnum.SUBTRACT:
        return '-';
      case OperationEnum.MULTIPLY:
        return '*';
      case OperationEnum.DIVIDE:
        return '/';
      case OperationEnum.POW:
        return '**';
      case OperationEnum.MOD:
        return '%';
      default:
        throw new Error(
          'Operator should be stringified as a function instead.',
        );
    }
  }

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
      case OperationEnum.SQRT: {
        if (debug) {
          console.log(debugLabel, `sqrt(${a})`, '=', Math.pow(a, b));
        }
        return Math.sqrt(a);
      }
      case OperationEnum.MOD: {
        if (debug) {
          console.log(debugLabel, a, '%', b, '=', a - b);
        }
        return a % b;
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
