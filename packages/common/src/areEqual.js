/**
 * perform deep comparison of two objects of any type.
 * @param {any} obj1 first object.
 * @param {any} obj2 second object.
 * @param {number} depth maximum comparison depth, `25` by default. This value improve performance with large object and circular dependencies
 * @returns
 */
function areEqual(obj1, obj2, depth = 10) {
    const shallowEqual = (obj1, obj2) => {
        /**
         * compare the two object with the predefined Object.is
         */
        if (Object.is(obj1, obj2)) return true;

        /**
         * making sure both object are of type "object"
         */
        if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null)
            return false;
    };

    const shallowComparison = shallowEqual(obj1, obj2);

    if (typeof shallowComparison === "boolean") return shallowComparison;

    const key1 = Object.keys(obj1);
    const key2 = Object.keys(obj2);

    /**
     * compare the number of keys
     */
    if (key1.length !== key2.length) return false;

    /**
     * compare the keys identifier
     */
    if ([...key1].sort().join("") !== [...key2].sort().join("")) return false;

    /**
     * recursively compare each key value.
     */
    for (let i = 0; i < key1.length; i++) {
        const shallowComparison = shallowEqual(obj1[key1[i]], obj2[key1[i]]);

        if (typeof shallowComparison === false) return false;

        if (depth > 0) {
            /**
             * We have an object as the value,
             * we recursively compare them.
             */
            if (!areEqual(obj1[key1[i]], obj2[key1[i]], depth - 1)) return false;
        }
    }

    return true;
}

module.exports = areEqual;
