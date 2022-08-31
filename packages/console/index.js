const { isDevMode } = require("../common");

/**
 * Display Error messages, logs and warnings in development mode.
 */
class RecursiveConsole {
    constructor() {}

    /**
     * Utility function to throw errors.
     * @env development
     * @param {String} msg
     * @param {Array} help
     */
    static error(msg, help) {
        if (!isDevMode() || !msg) return;

        let helpMsg = "";

        if (Array.isArray(help) && help.length > 0) {
            helpMsg += "- Help - " + help.join(", ");
        }

        throw new Error(`${msg} ${helpMsg}`);
    }

    /**
     * Utility function to display logs.
     * @env development
     * @param {String} msg
     * @param {Array} help
     */
    static log(msg) {
        if (!isDevMode() || !msg) return;

        console.log(msg);
    }

    /**
     * Utility function to display warnings.
     * @env development
     * @param {String} msg
     * @param {Array} help
     */
    static warn(msg) {
        if (!isDevMode() || !msg) return;

        console.warn(msg);
    }
}

module.exports = { RecursiveConsole };
