import {
    requestBatchingEnd,
    requestBatchingStart,
} from "../recursive-orchestrator/RecursiveOrchestrator.js";

function onClickGlobal(e) {
    const target = e.target;

    if (!Array.isArray(window.onclickglobal)) return;

    requestBatchingStart(`custom-event-on-click-global`);
    window.onclickglobal.forEach((element) => {
        if (element.contains(target)) return;
        element.events.onClickGlobal(e);
    });
    requestBatchingEnd(`custom-event-on-click-global`);

    const refresh = [];
    window.onclickglobal.forEach((element) => {
        if (document.contains(element)) {
            refresh.push(element);
        }
    });

    window.onclickglobal = refresh;
}

window.addEventListener("click", (e) => {
    onClickGlobal(e);
});

export default [];
