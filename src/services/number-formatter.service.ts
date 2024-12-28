export const NumberFormatterService = {
  formatNumber(value: number, decimals: boolean | number = false) {
    const decimalPlaces =
      decimals === true ? 3 : decimals === false ? 0 : decimals;
    const factor = Math.pow(10, decimalPlaces);
    const number = Math.round(value * factor) / factor;
    return number.toLocaleString('de-CH');
  },
};
