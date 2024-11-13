export const DynamicContextService = new (class DynamicContextService {
    createContext(props, variables) {
        const result = {};
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