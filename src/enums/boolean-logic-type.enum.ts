export enum BooleanLogicTypeEnum {
  /**
   * No logic present
   */
  NONE = 'none',

  // <editor-fold name="Comparisons">

  /**
   * Test a value
   */
  EQUAL = 'equal',

  /**
   * Test a value
   */
  GREATER_THAN = 'greater_than',

  /**
   * Test a value
   */
  GREATER_THAN_OR_EQUAL = 'greater_than_or_equal',

  /**
   * Test a value
   */
  LESS_THAN = 'less_than',

  /**
   * Test a value
   */
  LESS_THAN_OR_EQUAL = 'less_than_or_equal',

  // </editor-fold>

  // <editor-fold name="logic">

  /**
   * Matches if ALL conditions match
   */
  AND = 'and',

  /**
   * Matches if at least ONE condition matches
   */
  OR = 'or',

  /**
   * Matches if at least ONE condition does not match
   */
  NAND = 'nand',

  /**
   * Matches if NONE of the conditions match
   */
  NOR = 'nor',

  /**
   * Matches if at least ONE condition has a different result than another
   */
  XOR = 'xor',

  // </editor-fold>
}
