import onGlobal from "./events/onGlobal.js";
import handler from "./events/handler.js";

onGlobal("click", "onclickglobal", "onClickGlobal");
onGlobal("contextmenu", "oncontextmenuglobal", "onContextMenuGlobal");
onGlobal("resize", "onresizeglobal", "onResizeGlobal", false);
onGlobal("keyup", "onkeyupglobal", "onKeyUpGlobal", false);
onGlobal("scroll", "onscrollglobal", "onScrollGlobal", false);

export { handler };
