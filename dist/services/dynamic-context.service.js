"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicContextService = void 0;
exports.DynamicContextService = new (class DynamicContextService {
    createContext(props, variables) {
        const result = {
            ...props,
        };
        for (const [key, value] of Object.entries(props)) {
            result[`{${key}}`] = value;
        }
        if (variables) {
            for (const [key, value] of Object.entries(variables)) {
                result[`#${key}`] = value;
            }
        }
        return result;
    }
    cloneContext(input) {
        return { ...input };
    }
})();
//# sourceMappingURL=dynamic-context.service.js.map