"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicService = void 0;
const dynamic_context_service_1 = require("./dynamic-context.service");
const dynamic_reference_pattern_1 = require("../patterns/dynamic-reference.pattern");
const math_expression_service_1 = require("./math-expression.service");
const conditional_values_service_1 = require("./conditional-values.service");
const string_service_1 = require("./string.service");
const selection_service_1 = require("./selection.service");
exports.LogicService = new (class LogicService {
    resolve(value, context, debug = false) {
        if (debug) {
            console.debug('Resolving', JSON.stringify(value));
        }
        // Primitives
        if (typeof value === 'number' ||
            typeof value === 'boolean' ||
            value === null ||
            value === undefined) {
            if (debug) {
                console.debug(value, 'is a primitive');
            }
            return value;
        }
        // String
        if (typeof value === 'string') {
            if (dynamic_reference_pattern_1.DynamicReferencePattern.variable.test(value)) {
                if (debug) {
                    console.debug(value, 'is a variable reference');
                }
                return this.resolveVariable(value, context, debug);
            }
            else if (dynamic_reference_pattern_1.DynamicReferencePattern.property.test(value)) {
                if (debug) {
                    console.debug(value, 'is a property reference');
                }
                return this.resolveProperty(value, context, debug);
            }
            else {
                if (debug) {
                    console.debug(value, 'is a regular string');
                }
                return string_service_1.StringService.applyTextVariables(value, context, debug);
            }
        }
        // Array
        if (Array.isArray(value)) {
            if (value.length > 0 && value[0]?.operation) {
                if (debug) {
                    console.debug('Value is Function');
                }
                const innerContext = dynamic_context_service_1.DynamicContextService.cloneContext(context);
                for (let i = 0; i < value.length; i++) {
                    const currentValue = this.resolve(value[i], innerContext, debug);
                    if (i === value.length - 1) {
                        return currentValue;
                    }
                    const expression = value[i];
                    const variable = (expression ? expression.result : undefined) ?? 'value';
                    innerContext[`#${variable}`] = currentValue;
                }
            }
            else {
                if (debug) {
                    console.debug('Value is a regular array');
                }
                for (let i = 0; i < value.length; i += 1) {
                    value[i] = this.resolve(value[i], context, debug);
                }
                return value;
            }
        }
        // Conditional
        const conditional = value;
        if (conditional?.if) {
            if (debug) {
                console.debug('Value is a conditional');
            }
            return conditional_values_service_1.ConditionalValuesService.resolve(conditional, context, debug);
        }
        // Expression
        if (value?.operation) {
            const expression = value;
            return math_expression_service_1.MathExpressionService.resolve(expression, context, debug);
        }
        // Query
        if (value?.select?.from) {
            const selection = value;
            return selection_service_1.SelectionService.resolve(selection, context, debug);
        }
        // Static
        return value;
    }
    resolveVariable(name, context, debug) {
        if (debug) {
            console.debug('Looking up variable', name);
        }
        if (!context) {
            if (debug) {
                console.error('Cannot look up', name, 'in undefined context.');
            }
            return undefined;
        }
        const pathParts = name.split('.');
        if (debug && !context?.hasOwnProperty(pathParts[0])) {
            console.warn('Context does not contain a value for ', pathParts[0]);
        }
        let currentValue = this.resolve(context[pathParts[0]] ?? undefined, context, debug);
        if (debug) {
            console.debug('Root value:', currentValue);
        }
        for (let i = 1; i < pathParts.length; i++) {
            if (typeof currentValue === 'string' ||
                typeof currentValue === 'number' ||
                typeof currentValue === 'boolean' ||
                currentValue === null ||
                currentValue === undefined) {
                return currentValue;
            }
            if (debug && !currentValue.hasOwnProperty(pathParts[i])) {
                console.warn('No value found for path part', pathParts[i], 'in variable path', name);
            }
            currentValue = currentValue[pathParts[i]];
        }
        if (debug) {
            console.debug(name, '=', currentValue);
        }
        return this.resolve(currentValue, context, debug);
    }
    resolveProperty(name, context, debug) {
        if (debug) {
            console.debug('Looking up property', name);
        }
        if (!context) {
            if (debug) {
                console.error('Cannot look up', name, 'in undefined context.');
            }
            return undefined;
        }
        const pathParts = name.substring(1, name.length - 1).split('.');
        if (debug && !context?.hasOwnProperty(pathParts[0])) {
            console.warn('Context does not contain a value for ', `{${pathParts[0]}}`);
        }
        let currentValue = this.resolve(context[`{${pathParts[0]}}`] ?? undefined, context, debug);
        if (debug) {
            console.debug('Root value:', currentValue);
        }
        for (let i = 1; i < pathParts.length; i++) {
            if (typeof currentValue === 'string' ||
                typeof currentValue === 'number' ||
                typeof currentValue === 'boolean' ||
                currentValue === null ||
                currentValue === undefined) {
                return currentValue;
            }
            if (debug && !currentValue.hasOwnProperty(pathParts[i])) {
                console.warn('No value found for path part', pathParts[i], 'in property path', name);
            }
            currentValue = currentValue[pathParts[i]];
        }
        if (debug) {
            console.debug(name, '=', currentValue);
        }
        return this.resolve(currentValue, context, debug);
    }
    createVariableMap(variables, parentPath) {
        const result = new Map();
        for (const [key, value] of variables) {
            result.set(`${parentPath}.${key}`, value);
        }
        return result;
    }
    /**
     * Replaces all occurrences of the provided variables with their value.
     * @param input
     * @param variables
     */
    applyVariables(input, variables) {
        if (input == null) {
            return null;
        }
        if (typeof input === 'string') {
            for (const [key, value] of variables) {
                if (input === `{${key}}`) {
                    return value;
                }
            }
            return this.applyTextVariables(input, variables);
        }
        if (input instanceof Array) {
            const result = [];
            for (const value of input) {
                result.push(this.applyVariables(value, variables));
            }
            return result;
        }
        if (typeof input === 'object') {
            const result = {};
            for (const key of Object.keys(input)) {
                result[key] = this.applyVariables(input[key], variables);
            }
            return result;
        }
        return input;
    }
    applyTextVariables(text, variables) {
        for (const [key, value] of variables) {
            text = text.split(`{${key}}`).join(value);
        }
        return text;
    }
    applyOverrides(base, overrides) {
        if (!overrides) {
            if (!base) {
                return JSON.parse(JSON.stringify(overrides));
            }
            const result = JSON.parse(JSON.stringify(base));
            for (const key of Object.keys(overrides)) {
                result[key] = this.applyOverrides(base[key], overrides[key]);
            }
            return result;
        }
        else if (overrides instanceof Array) {
            if (!(base instanceof Array) || base.length === 0) {
                return JSON.parse(JSON.stringify(overrides));
            }
            const result = JSON.parse(JSON.stringify(base));
            const appended = [];
            for (let i = 0; i < overrides.length; i++) {
                const override = overrides[i];
                if (override instanceof Object) {
                    const id = override['id'];
                    const existing = id != null
                        ? base.find((element) => element instanceof Object && element['id'] === id)
                        : null;
                    if (existing != null) {
                        const existingIndex = base.indexOf(existing);
                        result[existingIndex] = this.applyOverrides(existing, override);
                        continue;
                    }
                }
                if (i >= result.length) {
                    appended.push(JSON.parse(JSON.stringify(override)));
                    continue;
                }
                result[i] = this.applyOverrides(base[i], override);
            }
            for (const entry of appended) {
                result.push(entry);
            }
            return result;
        }
        else
            return overrides;
    }
    pickRandomWeighted(options, random) {
        if (options.length === 0) {
            return null;
        }
        let totalWeight = 0;
        for (const option of options) {
            totalWeight += option['weight'] || 1;
        }
        let randomIndex = random.next() * totalWeight;
        for (const option of options) {
            const weight = option['weight'] || 1;
            if (randomIndex > weight) {
                randomIndex -= weight;
                continue;
            }
            return option['value'];
        }
        return null;
    }
})();
//# sourceMappingURL=logic.service.js.map