const { RecursiveRenderer } = require("../");
const {
    RENDERER_PHASE_ON_DESTROYED,
    RENDERER_PHASE_CHANGES,
    RENDERER_PHASE_ON_UPDATED,
} = require("../../constants");
const prepareElement = require("./prepareElement");

/**
 * Update the tree of elements
 * @param {RecursiveRenderer} renderer
 */
function update(renderer) {
    renderer.orchestrator.setStep.computeTree();

    let _new;

    _new = prepareElement(renderer.app(), "0", renderer);

    renderer.useRendererOnTreePrepared(_new);

    renderer.orchestrator.setStep.computeDiff();
    renderer.updateElement(renderer.current, _new);
    renderer.current = _new;

    renderer.orchestrator.setStep.execBeforeDestroyed();
    renderer.runPhase(RENDERER_PHASE_ON_DESTROYED);

    renderer.orchestrator.setStep.commit();
    renderer.runPhase(RENDERER_PHASE_CHANGES);

    renderer.orchestrator.setStep.execOnDestroyed();
    renderer.runPhase(RENDERER_PHASE_ON_DESTROYED);

    renderer.orchestrator.setStep.execOnUpdated();
    renderer.runPhase(RENDERER_PHASE_ON_UPDATED);

    renderer.orchestrator.setStep.cleanStates();
    renderer.setInstanceReference(renderer.current);
    renderer.clean();
}

module.exports = update;
