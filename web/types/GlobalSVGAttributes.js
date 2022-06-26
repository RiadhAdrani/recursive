const { default: Events } = require("./Events");
const { default: RecursiveAttributes } = require("./RecursiveAttributes");
const { default: SvgCore } = require("./SvgCore");

module.exports = {
    ...RecursiveAttributes,
    ...SvgCore,
    ...Events,
};
