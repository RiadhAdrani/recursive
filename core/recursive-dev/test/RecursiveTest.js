function describe(description) {
    return {
        assert(value, stringify = false) {
            return {
                start(callback) {
                    const result = stringify ? JSON.stringify(callback()) : callback();
                    const toBe = stringify ? JSON.stringify(value) : value;

                    const res = { description, toBe, result, passed: toBe === result };

                    return res;
                },
            };
        },
    };
}

export { describe };
