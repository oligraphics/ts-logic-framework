import { OperationEnum } from '../enums/operation.enum.js';
export declare const MathOperationService: {
    parse(input: string): OperationEnum;
    stringify(operation: OperationEnum): string;
    run(operation: OperationEnum, a: number, b: number, debug?: boolean, debugLabel?: string | undefined): number;
};
//# sourceMappingURL=math-operation.service.d.ts.map