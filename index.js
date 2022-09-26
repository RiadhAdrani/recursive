const { RecursiveOrchestrator } = require("./packages/orchestrator");
const { RecursiveRenderer, createElement } = require("./packages/renderer");
const { RecursiveRouter, createRoute } = require("./packages/router");
const { RecursiveState } = require("./packages/state");
const { RecursiveConsole } = require("./packages/console");
const { RecursiveApp } = require("./packages/app");

module.exports = {
    createElement,
    createRoute,
    RecursiveOrchestrator,
    RecursiveRenderer,
    RecursiveRouter,
    RecursiveState,
    RecursiveConsole,
    RecursiveApp,
};
