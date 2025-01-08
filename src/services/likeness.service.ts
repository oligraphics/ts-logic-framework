export const LikenessService = new (class CompareService {
  /**
   * Test if <code>value</code> matches <code>like</code>
   * <ul>
   *   <li>If <code>like</code> is a primitive, compare <code>a === b</code></li>
   *   <li>If <code>like</code> is an array, if <code>value</code> is also an array, <code>value</code> must contain all values in <code>like</code>, otherwise <code>like</code> must include <code>value</code></li>
   *   <li>If <code>value</code> is an array, but <code>like</code> is not, <code>value</code> must include <code>like</code></li>
   *   <li>If <code>like</code> is an object, <code>value</code> must match the same data structure</li>
   *   </ul>
   */
  test(value: unknown, like: unknown): boolean {
    if (
      like === undefined ||
      like === null ||
      typeof like === 'number' ||
      typeof like === 'string' ||
      typeof like === 'boolean'
    ) {
      // Perform simple comparison
      return value === like;
    }
    if (Array.isArray(like)) {
      if (Array.isArray(value)) {
        // All elements in value must be included in input
        return like.find((v) => !value.includes(v)) === undefined;
      } else {
        // Value must include the input
        return like.includes(value);
      }
    }
    if (Array.isArray(value)) {
      // Input must include the value
      return value.includes(like);
    }
    if (typeof value !== 'object') {
      // Value should have been an object as well
      return false;
    }
    const valueObject: { [key: string]: unknown } = value as {
      [key: string]: unknown;
    };
    // Input must match the object structure in equals
    for (const [key, valueEquals] of Object.entries(<object>like)) {
      if (
        !valueObject.hasOwnProperty(key) ||
        !this.test(valueObject[key], valueEquals)
      ) {
        return false;
      }
    }
    return true;
  }
})();
