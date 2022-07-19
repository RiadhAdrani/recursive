/**
 * Return if the current environment is "development" mode.
 * @returns {boolean}
 */
function isDevMode() {
    return process.env.NODE_ENV === "development";
}

export default isDevMode;
