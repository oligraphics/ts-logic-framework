export declare enum BooleanLogicTypeEnum {
    /**
     * No logic present
     */
    NONE = "none",
    /**
     * Test if <code>a</code> matches <code>b</code> exactly
     * <ul>
     *   <li>If <code>b</code> is a primitive or an object, test <code>a === b</code></li>
     *   <li>If <code>b</code> is an array, test individual array items as <code>a[n] === b[n]</code></li>
     *   </ul>
     */
    EQUAL = "equal",
    /**
     * Test if <code>a</code> matches <code>b</code>
     * <ul>
     *   <li>If <code>b</code> is a primitive, compare <code>a === b</code></li>
     *   <li>If <code>b</code> is an array, if <code>a</code> is also an array, <code>a</code> must contain all values in <code>b</code>, otherwise <code>b</code> must include <code>a</code></li>
     *   <li>If <code>a</code> is an array, but <code>b</code> is not, <code>a</code> must include <code>b</code></li>
     *   <li>If <code>b</code> is an object, <code>a</code> must match the same data structure</li>
     *   </ul>
     */
    LIKE = "like",
    /**
     * Test a regular expression: <code>b.exec(a)</code>
     */
    PATTERN = "pattern",
    /**
     * Test a value
     */
    GREATER_THAN = "greater_than",
    /**
     * Test a value
     */
    GREATER_THAN_OR_EQUAL = "greater_than_or_equal",
    /**
     * Test a value
     */
    LESS_THAN = "less_than",
    /**
     * Test a value
     */
    LESS_THAN_OR_EQUAL = "less_than_or_equal",
    /**
     * Matches if ALL conditions match
     */
    AND = "and",
    /**
     * Matches if at least ONE condition matches
     */
    OR = "or",
    /**
     * Matches if at least ONE condition does not match
     */
    NAND = "nand",
    /**
     * Matches if NONE of the conditions match
     */
    NOR = "nor",
    /**
     * Matches if at least ONE condition has a different result than another
     */
    XOR = "xor"
}
//# sourceMappingURL=boolean-logic-type.enum.d.ts.map