export const EqualityService = new (class CompareService {
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
      if (Array.isArray(value)) {
        // All elements in value must be included in input
        return equals.find((v) => !value.includes(v)) === undefined;
      } else {
        // Value must include the input
        return equals.includes(value);
      }
    }
    if (Array.isArray(value)) {
      // Input must include the value
      return value.includes(equals);
    }
    if (typeof value !== 'object') {
      // Value should have been an object as well
      return false;
    }
    const valueObject: { [key: string]: unknown } = value as {
      [key: string]: unknown;
    };
    // Input must match the object structure in equals
    for (const [key, valueEquals] of Object.entries(<object>equals)) {
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
