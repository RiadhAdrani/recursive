/**
 * create a new instance from the given object.
 * @param source source object.
 */
function copy<T>(source: T): T;

/**
 * return if the current environment is "development" mode.
 */
function isDevMode(): boolean;

/**
 * perform deep comparison of two objects of any type.
 * @param obj1 first object.
 * @param obj2 second object.
 * @param depth maximum comparison depth, `25` by default. This value improve performance with large object and circular dependencies
 */
function areEqual(obj1: any, obj2: any, depth?: number): boolean;

export { copy, isDevMode, areEqual };
