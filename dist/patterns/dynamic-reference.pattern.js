"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicReferencePattern = void 0;
exports.DynamicReferencePattern = {
    /**
     * Properties are static context values or objects provided by the system.<br>
     * Access child properties with dot (.) paths: <code>{object.property.subproperty}</code> etc.
     */
    property: /^\{[a-zA-Z0-9_.-]+}$/,
    /**
     * Variables are dynamic values named and assigned by custom logic.
     * Access child properties with dot (.) paths: <code>#object.property.subproperty</code> etc.
     */
    variable: /^#[a-z0-9_-]+(\.[a-zA-Z0-9_-]+)*$/,
};
//# sourceMappingURL=dynamic-reference.pattern.js.map