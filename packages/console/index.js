const { isDevMode } = require("../common");

/**
 * Utility function to throw errors.
 * @env development
 * @param {String} msg
 * @param {Array} help
 */
function error(msg, help) {
    if (!isDevMode() || !msg) return;

    let helpMsg = "";

    if (Array.isArray(help) && help.length > 0) {
        helpMsg += "- Help - " + help.join(", ");
    }

    throw new Error(`${msg} ${helpMsg}`);
}

/**
 * Utility function to display warnings.
 * @env development
 * @param {String} msg
 * @param {Array} help
 */
function warn(msg) {
    if (!isDevMode() || !msg) return;

    console.warn(msg);
}

/**
 * Utility function to display logs.
 * @env development
 * @param {String} msg
 * @param {Array} help
 */
function log(msg) {
    if (!isDevMode() || !msg) return;

    console.log(msg);
}

const RecursiveConsole = {
    error,
    warn,
    log,
};

module.exports = { RecursiveConsole };
