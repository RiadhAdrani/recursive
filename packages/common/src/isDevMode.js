const { DEVELOPMENT_MODE } = require("../../constants");

/**
 * Return if the current environment is "development" mode.
 * @returns {boolean}
 */
function isDevMode() {
    return process.env.NODE_ENV === DEVELOPMENT_MODE;
}

module.exports = isDevMode;
