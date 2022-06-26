const { default: Events } = require("./Events");
const { default: HtmlCore } = require("./HtmlCore");
const { default: RecursiveAttributes } = require("./RecursiveAttributes");

module.exports = { ...RecursiveAttributes, ...HtmlCore, ...Events };
