const { FLAGS_RENDER_IF, FLAGS_FORCE_RERENDER } = require("../../constants");

const list = { forceRerender: FLAGS_FORCE_RERENDER, renderIf: FLAGS_RENDER_IF };

function isFlag(flag) {
    if (!list[flag]) return false;

    return true;
}

module.exports = { isFlag, list };
