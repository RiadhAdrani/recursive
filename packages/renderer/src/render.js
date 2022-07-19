import { RecursiveRenderer } from "../";
import prepareElement from "./prepareElement";

/**
 * Render the tree of elements.
 * @param {RecursiveRenderer} renderer
 */
function render(renderer) {
    if (typeof renderer.app !== "function") RecursiveConsole.error("App is not of type function");

    if (!renderer.root) RecursiveConsole.error("No root was specified.");

    renderer.orchestrator.setStep.computeTree();

    renderer.contextManager.useContext(() => {
        renderer.current = prepareElement(renderer.app(), "0", renderer);
    }, "0");

    renderer.useRendererOnTreePrepared(renderer.current);

    renderer.orchestrator.setStep.commit();
    renderer.useRendererRenderTree();

    renderer.orchestrator.setStep.execOnCreated();
    renderer.runPhase("onCreated");
    renderer.setInstanceReference(renderer.current);
    renderer.clean();

    renderer.orchestrator.setStep.free();
}

export default render;
