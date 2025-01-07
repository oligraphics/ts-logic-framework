import { ComputableValue } from './computable-value.interface';

/**
 * Interface to build type definitions with intended types the values should
 * resolve to, e.g. "this is a ComputedValue which should resolve to T"
 */
export type Computable<T> = T | ComputableValue;
