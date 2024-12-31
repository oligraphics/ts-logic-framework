import { DynamicContext } from '../interfaces/dynamic-context.interface';
export declare const StringService: {
    applyTextVariables(text: string, context: DynamicContext, debug?: boolean): string;
    toSnake(value: string): string;
    toLowerCaseUnderscore(value: string): string;
    /**
     * Removes spaces and underscores, and changes the value to lowercase for easy, loose comparison
     */
    toCompareString(input: string): string;
};
//# sourceMappingURL=string.service.d.ts.map