export declare const LikenessService: {
    /**
     * Test if <code>value</code> matches <code>like</code>
     * <ul>
     *   <li>If <code>like</code> is a primitive, compare <code>a === b</code></li>
     *   <li>If <code>like</code> is an array, if <code>value</code> is also an array, <code>value</code> must contain all values in <code>like</code>, otherwise <code>like</code> must include <code>value</code></li>
     *   <li>If <code>value</code> is an array, but <code>like</code> is not, <code>value</code> must include <code>like</code></li>
     *   <li>If <code>like</code> is an object, <code>value</code> must match the same data structure</li>
     *   </ul>
     */
    test(value: unknown, like: unknown): boolean;
};
//# sourceMappingURL=likeness.service.d.ts.map