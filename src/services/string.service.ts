export const StringService = new (class {
  toSnake(value: string): string {
    return value.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
  }
  toLowerCaseUnderscore(value: string) {
    return value
      .split(' ')
      .join('_')
      .split('-')
      .join('_')
      .toLowerCase()
      .replace(/[^a-z0-9_]/gi, '');
  }

  /**
   * Removes spaces and underscores, and changes the value to lowercase for easy, loose comparison
   */
  toCompareString(input: string) {
    return input.toLowerCase().replace(/[^a-z0-9]/gi, '');
  }
})();
