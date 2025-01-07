import { DynamicContext } from '../interfaces/dynamic-context.interface';
export declare const StringService: {
    /**
     * Replaces {properties} and #variables with context values. This supports
     * nested object access with {object.property...} and #object.property...
     */
    applyTextVariables(text: string, context: DynamicContext, debug?: boolean): string;
    /**
     * Convert <code>thisIsAValue</code> to <code>this_is_a_value</code>
     */
    toSnake(value: string): string;
    /**
     * Convert <code>This is a value with umlaut äöü</code> to
     * <code>this_is_a_value_with_umlaut_</code> by trimming all non-alphanumeric
     * and non-underscore characters and then converting to lower case
     */
    toLowerCaseUnderscore(value: string): string;
    /**
     * Removes spaces and underscores, and changes the value to lowercase for easy, loose comparison
     */
    toCompareString(input: string): string;
};
//# sourceMappingURL=string.service.d.ts.map