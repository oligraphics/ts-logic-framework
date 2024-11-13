export const StringUtilityService = new (class StringUtilityService {
    toLowerCaseUnderscore(value) {
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
    toCompareString(input) {
        return input.toLowerCase().replace(/[^a-z0-9]/gi, '');
    }
})();
//# sourceMappingURL=string-utility.service.js.map