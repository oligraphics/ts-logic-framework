"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanLogicTypeEnum = void 0;
var BooleanLogicTypeEnum;
(function (BooleanLogicTypeEnum) {
    /**
     * No logic present
     */
    BooleanLogicTypeEnum["NONE"] = "none";
    // <editor-fold name="Comparisons">
    /**
     * Test if <code>a</code> matches <code>b</code> exactly
     * <ul>
     *   <li>If <code>b</code> is a primitive or an object, test <code>a === b</code></li>
     *   <li>If <code>b</code> is an array, test individual array items as <code>a[n] === b[n]</code></li>
     *   </ul>
     */
    BooleanLogicTypeEnum["EQUAL"] = "equal";
    /**
     * Test if <code>a</code> matches <code>b</code>
     * <ul>
     *   <li>If <code>b</code> is a primitive, compare <code>a === b</code></li>
     *   <li>If <code>b</code> is an array, if <code>a</code> is also an array, <code>a</code> must contain all values in <code>b</code>, otherwise <code>b</code> must include <code>a</code></li>
     *   <li>If <code>a</code> is an array, but <code>b</code> is not, <code>a</code> must include <code>b</code></li>
     *   <li>If <code>b</code> is an object, <code>a</code> must match the same data structure</li>
     *   </ul>
     */
    BooleanLogicTypeEnum["LIKE"] = "like";
    /**
     * Test a regular expression: <code>b.exec(a)</code>
     */
    BooleanLogicTypeEnum["PATTERN"] = "pattern";
    /**
     * Test a value
     */
    BooleanLogicTypeEnum["GREATER_THAN"] = "greater_than";
    /**
     * Test a value
     */
    BooleanLogicTypeEnum["GREATER_THAN_OR_EQUAL"] = "greater_than_or_equal";
    /**
     * Test a value
     */
    BooleanLogicTypeEnum["LESS_THAN"] = "less_than";
    /**
     * Test a value
     */
    BooleanLogicTypeEnum["LESS_THAN_OR_EQUAL"] = "less_than_or_equal";
    // </editor-fold>
    // <editor-fold name="logic">
    /**
     * Matches if ALL conditions match
     */
    BooleanLogicTypeEnum["AND"] = "and";
    /**
     * Matches if at least ONE condition matches
     */
    BooleanLogicTypeEnum["OR"] = "or";
    /**
     * Matches if at least ONE condition does not match
     */
    BooleanLogicTypeEnum["NAND"] = "nand";
    /**
     * Matches if NONE of the conditions match
     */
    BooleanLogicTypeEnum["NOR"] = "nor";
    /**
     * Matches if at least ONE condition has a different result than another
     */
    BooleanLogicTypeEnum["XOR"] = "xor";
    // </editor-fold>
})(BooleanLogicTypeEnum || (exports.BooleanLogicTypeEnum = BooleanLogicTypeEnum = {}));
//# sourceMappingURL=boolean-logic-type.enum.js.map