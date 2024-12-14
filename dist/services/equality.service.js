"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EqualityService = void 0;
exports.EqualityService = new (class CompareService {
    test(value, equals) {
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
        else if (Array.isArray(value)) {
            // Input must include the value
            return value.includes(equals);
        }
        else if (typeof equals === 'object') {
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
        else {
            // Input must equal value
            return value === equals;
        }
    }
})();
//# sourceMappingURL=equality.service.js.map