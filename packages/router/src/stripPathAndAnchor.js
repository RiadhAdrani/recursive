const { ROUTER_ANCHOR_REG_EXP } = require("../../constants");

/**
 * Divide a destination into path and anchor.
 * @param {String} destination
 * @return {[String,String]} result
 */
function stripPathAndAnchor(destination) {
    /**
     * We only accept `string` as the only type of input.
     */
    if (typeof destination !== "string") return ["", ""];

    const regEx = ROUTER_ANCHOR_REG_EXP;

    const result = regEx.exec(destination);

    let path = "";
    let anchor = "";

    if (result) {
        path = destination.substring(0, result.index);
        anchor = destination.substring(result.index);
    } else {
        path = destination;
    }

    return [path, anchor];
}

module.exports = stripPathAndAnchor;
