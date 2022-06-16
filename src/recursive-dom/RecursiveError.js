/**
 *
 * @param {String} msg
 * @param {Array} help
 */
const throwError = (msg, help) => {
    const error = new Error(msg);
    error.help = help;

    throw `${error} - Help : ${help.join(", ")}`;
};

export { throwError };
