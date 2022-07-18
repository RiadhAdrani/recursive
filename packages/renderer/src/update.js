import RecursiveRenderer from "../RecursiveRenderer";
import prepareElement from "./prepareElement";

/**
 * Update the tree of elements
 * @param {RecursiveRenderer} renderer
 */
function update(renderer) {
    renderer.orchestrator.setStep.computeTree();

    let _new;

    renderer.contextManager.useContext(() => {
        _new = prepareElement(renderer.app(), "0", renderer);
    }, "0");

    renderer.useRendererOnTreePrepared(_new);

    renderer.orchestrator.setStep.computeDiff();
    renderer.updateElement(renderer.current, _new);
    renderer.current = _new;

    renderer.orchestrator.setStep.execBeforeDestroyed();
    renderer.runPhase("beforeDestroyed");

    renderer.orchestrator.setStep.commit();
    renderer.runPhase("changes");

    renderer.orchestrator.setStep.execOnDestroyed();
    renderer.runPhase("onDestroyed");

    renderer.orchestrator.setStep.execOnUpdated();
    renderer.runPhase("onUpdated");

    renderer.orchestrator.setStep.cleanStates();
    renderer.setInstanceReference(renderer.current);
    renderer.clean();
}

export default update;
