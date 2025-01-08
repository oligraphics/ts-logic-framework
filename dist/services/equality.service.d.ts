export declare const EqualityService: {
    /**
     * Test if <code>value</code> matches <code>equals</code> exactly
     * <ul>
     *   <li>If <code>equals</code> is a primitive or an object, test <code>value === equals</code></li>
     *   <li>If <code>equals</code> is an array, test individual array items as <code>test(value[n], equals[n])</code></li>
     *   </ul>
     */
    test(value: unknown, equals: unknown): boolean;
};
//# sourceMappingURL=equality.service.d.ts.map