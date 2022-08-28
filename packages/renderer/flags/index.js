const { FLAGS_RENDER_IF, FLAGS_FORCE_RERENDER } = require("../../constants");

/**
 * Object containing all flags.
 */
const list = { forceRerender: FLAGS_FORCE_RERENDER, renderIf: FLAGS_RENDER_IF };

/**
 * Check if the given key represents a flag.
 * @param {string} key string representing the flag.
 * @returns {boolean} Check result.
 */
function isFlag(key) {
    if (!list[key]) return false;

    return true;
}

module.exports = { isFlag, list };
