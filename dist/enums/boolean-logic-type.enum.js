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
     * Test a value
     */
    BooleanLogicTypeEnum["EQUAL"] = "equal";
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