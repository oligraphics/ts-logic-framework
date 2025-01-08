export const EqualityService = new (class CompareService {
  /**
   * Test if <code>value</code> matches <code>equals</code> exactly
   * <ul>
   *   <li>If <code>equals</code> is a primitive or an object, test <code>value === equals</code></li>
   *   <li>If <code>equals</code> is an array, test individual array items as <code>test(value[n], equals[n])</code></li>
   *   </ul>
   */
  test(value: unknown, equals: unknown): boolean {
    if (
      equals === undefined ||
      equals === null ||
      typeof equals === 'number' ||
      typeof equals === 'string' ||
      typeof equals === 'boolean'
    ) {
      // Perform simple comparison
      return value === equals;
    }
    if (Array.isArray(equals)) {
      if (!Array.isArray(value)) {
        return false;
      }

      return (
        equals.length === value.length &&
        equals.every((item, index) => this.test(value[index], item))
      );
    }
    return value === equals;
  }
})();
