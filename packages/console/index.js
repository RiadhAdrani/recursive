const { isDevMode } = require("../common");

/**
 * Display Error messages, logs and warnings in development mode.
 */
class RecursiveConsole {
    constructor() {}

    /**
     * @param {Map<string,any>} params
     */
    static showDeveloperHelp(params) {}

    /**
     * @param {String} msg
     * @param {Array} help
     */
    static error(msg, help) {
        if (!isDevMode() || !msg) return;

        let helpMsg = "";

        if (Array.isArray(help) && help.length > 0) {
            helpMsg += "- Help - " + help.join(", ");
        }

        this.showDeveloperHelp({ msg, help });

        throw new Error(`${msg} ${helpMsg}`);
    }

    /**
     * @param {String} msg
     * @param {Array} help
     */
    static log(msg) {
        if (!isDevMode() || !msg) return;

        console.log(msg);
    }

    /**
     * @param {String} msg
     */
    static warn(msg) {
        if (!isDevMode() || !msg) return;

        this.showDeveloperHelp({ msg });

        console.warn(msg);
    }
}

module.exports = { RecursiveConsole };
