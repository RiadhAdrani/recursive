/**
 * Utility function to throw errors.
 * @param {String} msg
 * @param {Array} help
 */
const throwError = (msg, help) => {
    if (!msg) return;

    let helpMsg = "";

    if (Array.isArray(help) && help.length > 0) {
        helpMsg += "- Help - " + help.join(", ");
    }

    throw new Error(`${msg} ${helpMsg}`);
};

export { throwError };
