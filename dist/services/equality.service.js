"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EqualityService = void 0;
exports.EqualityService = new (class CompareService {
    test(value, equals) {
        if (equals === undefined ||
            equals === null ||
            typeof equals === 'number' ||
            typeof equals === 'string' ||
            typeof equals === 'boolean') {
            // Perform simple comparison
            return value === equals;
        }
        if (Array.isArray(equals)) {
            if (Array.isArray(value)) {
                // All elements in value must be included in input
                return equals.find((v) => !value.includes(v)) === undefined;
            }
            else {
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
        const valueObject = value;
        // Input must match the object structure in equals
        for (const [key, valueEquals] of Object.entries(equals)) {
            if (!valueObject.hasOwnProperty(key) ||
                !this.test(valueObject[key], valueEquals)) {
                return false;
            }
        }
        return true;
    }
})();
//# sourceMappingURL=equality.service.js.map