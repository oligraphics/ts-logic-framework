"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringService = void 0;
const dynamic_reference_pattern_1 = require("../patterns/dynamic-reference.pattern");
const logic_service_1 = require("./logic.service");
exports.StringService = new (class {
    applyTextVariables(text, context, debug) {
        let currentText = text;
        let previousPropertyMatch = undefined;
        let propertyMatch;
        do {
            propertyMatch =
                dynamic_reference_pattern_1.DynamicReferencePattern.propertyFragment.exec(currentText);
            if (propertyMatch) {
                if (debug) {
                    console.debug('Property match:', propertyMatch[0]);
                }
                if (propertyMatch.index === previousPropertyMatch?.index &&
                    propertyMatch[0] === previousPropertyMatch[0]) {
                    console.error('Recursion detected:', previousPropertyMatch[0]);
                    break;
                }
                currentText = currentText.replace(propertyMatch[0], logic_service_1.LogicService.resolveProperty(propertyMatch[0], context, debug));
            }
            previousPropertyMatch = propertyMatch;
        } while (propertyMatch);
        let previousVariableMatch = undefined;
        let variableMatch;
        do {
            variableMatch =
                dynamic_reference_pattern_1.DynamicReferencePattern.variableFragment.exec(currentText);
            if (variableMatch) {
                if (debug) {
                    console.debug('Variable match: ', variableMatch[0]);
                }
                if (variableMatch.index === previousVariableMatch?.index &&
                    variableMatch[0] === previousVariableMatch[0]) {
                    console.error('Recursion detected:', variableMatch[0]);
                    break;
                }
                currentText = currentText.replace(variableMatch[0], logic_service_1.LogicService.resolveVariable(variableMatch[0], context, debug));
            }
            previousVariableMatch = variableMatch;
        } while (variableMatch);
        return currentText;
    }
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