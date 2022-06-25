import onGlobal from "./events/onGlobal.js";
import handler from "./events/handler.js";

function useRecursiveWindow(orchestrator) {
    onGlobal(orchestrator, "click", "onclickglobal", "onClickGlobal");
    onGlobal(orchestrator, "contextmenu", "oncontextmenuglobal", "onContextMenuGlobal");
    onGlobal(orchestrator, "resize", "onresizeglobal", "onResizeGlobal", false);
    onGlobal(orchestrator, "keyup", "onkeyupglobal", "onKeyUpGlobal", false);
    onGlobal(orchestrator, "scroll", "onscrollglobal", "onScrollGlobal", false);
}

export { handler, useRecursiveWindow };
