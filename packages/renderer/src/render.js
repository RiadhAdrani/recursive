const { RecursiveRenderer } = require("../");
const { RecursiveConsole } = require("../../console");
const { RENDERER_PHASE_ON_CREATED } = require("../../constants");
const prepareElement = require("./prepareElement");

/**
 * Render the tree of elements.
 * @param {RecursiveRenderer} renderer
 */
function render(renderer) {
    if (typeof renderer.app !== "function") RecursiveConsole.error("App is not of type function");

    if (!renderer.root) RecursiveConsole.error("No root was specified.");

    renderer.orchestrator.setStep.computeTree();

    renderer.current = prepareElement(renderer.app(), "0", null, renderer);

    renderer.useRendererOnTreePrepared(renderer.current);

    renderer.orchestrator.setStep.commit();
    renderer.useRendererRenderTree();

    renderer.orchestrator.setStep.execOnCreated();
    renderer.runPhase(RENDERER_PHASE_ON_CREATED);
    renderer.setInstanceReference(renderer.current);
    renderer.clean();

    renderer.orchestrator.setStep.free();
}

module.exports = render;
