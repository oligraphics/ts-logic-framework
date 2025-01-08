import Rand from 'rand-seed';
import { DynamicContext } from '../interfaces/dynamic-context.interface';
import { ComputableValue } from '../interfaces/computable-value.interface';
export declare const LogicService: {
    resolve<T>(value: ComputableValue, context: DynamicContext, debug?: boolean): T | undefined;
    resolveVariable<T>(name: string, context: DynamicContext, debug?: boolean): T | undefined;
    resolveProperty<T>(name: string, context: DynamicContext, debug?: boolean): T | undefined;
    resolveNested<T>(fullPath: string, initialKey: string, pathParts: string[], context: DynamicContext, debug?: boolean): T | undefined;
    createVariableMap(variables: Map<string, any>, parentPath: string): Map<string, any>;
    /**
     * Replaces all occurrences of the provided variables with their value.
     * @param input
     * @param variables
     */
    applyVariables(input: any, variables: Map<string, any>): any;
    applyTextVariables(text: string, variables: Map<string, any>): string;
    applyOverrides(base: {
        [key: string]: any;
    }, overrides: {
        [key: string]: any;
    }): {
        [key: string]: any;
    };
    pickRandomWeighted(options: {
        [key: string]: any;
    }[], random: Rand): unknown;
};
//# sourceMappingURL=logic.service.d.ts.map