"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberFormatterService = void 0;
exports.NumberFormatterService = {
    formatNumber(value, decimals = false) {
        const decimalPlaces = decimals === true ? 3 : decimals === false ? 0 : decimals;
        const factor = Math.pow(10, decimalPlaces);
        const number = Math.round(value * factor) / factor;
        return number.toLocaleString('de-CH');
    },
};
//# sourceMappingURL=number-formatter.service.js.map