const { AbstractRenderer } = require("..");
const { RecursiveOrchestrator } = require("../../../orchestrator");
const { RecursiveState } = require("../../../state");

function createAbstractRenderer(app, root = {}) {
    const StateManager = new RecursiveState();
    const Orchestrator = new RecursiveOrchestrator();
    const Renderer = new AbstractRenderer(app, root);

    Renderer.orchestrator = Orchestrator;
    Renderer.stateManager = StateManager;
    StateManager.orchestrator = Orchestrator;
    Orchestrator.renderer = Renderer;

    return Renderer;
}

module.exports = createAbstractRenderer;
