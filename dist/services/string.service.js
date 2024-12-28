"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringService = void 0;
exports.StringService = new (class {
    toSnake(value) {
        return value.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    }
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
//# sourceMappingURL=string.service.js.map