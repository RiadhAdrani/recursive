const { RecursiveRenderer } = require("../");
const {
    RENDERER_PHASE_ON_DESTROYED,
    RENDERER_PHASE_CHANGES,
    RENDERER_PHASE_ON_UPDATED,
    RECURSIVE_ELEMENT_SYMBOL,
    RENDERER_PHASE_BEFORE_DESTROYED,
    RENDERER_PHASE_ON_CREATED,
} = require("../../constants");
const prepareElement = require("./prepareElement");

/**
 * Update the tree of elements
 * @param {RecursiveRenderer} renderer
 */
function update(renderer) {
    renderer.orchestrator.setStep.computeTree();

    let _new;

    _new = prepareElement(renderer.app(), "0", null, renderer);

    if (_new.$$_RecursiveSymbol != RECURSIVE_ELEMENT_SYMBOL) {
        RecursiveConsole.error("Root element is not of type RecursiveElement.", [
            "Use createRecursiveElement to create a valid element.",
        ]);
    }

    renderer.useRendererOnTreePrepared(_new);

    renderer.orchestrator.setStep.computeDiff();
    renderer.updateElement(renderer.current, _new);
    renderer.current = _new;

    renderer.orchestrator.setStep.execBeforeDestroyed();
    renderer.runPhase(RENDERER_PHASE_BEFORE_DESTROYED);

    renderer.orchestrator.setStep.commit();
    renderer.runPhase(RENDERER_PHASE_CHANGES);

    renderer.orchestrator.setStep.execOnDestroyed();
    renderer.runPhase(RENDERER_PHASE_ON_DESTROYED);

    renderer.orchestrator.setStep.execOnUpdated();
    renderer.runPhase(RENDERER_PHASE_ON_UPDATED);

    renderer.orchestrator.setStep.execOnCreated();
    renderer.runPhase(RENDERER_PHASE_ON_CREATED);

    renderer.orchestrator.setStep.cleanStates();
    renderer.setInstanceReference(renderer.current);
    renderer.clean();
}

module.exports = update;
