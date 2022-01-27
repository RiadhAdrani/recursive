import { throwError } from "./RecursiveError";
import StateRegistry from "../RecursiveState/StateRegistry";

const _UPDATE_START = "recursive-update";
const _STYLE_COMPUTE = "recursive-compute-style";
const _STYLE_COMPONENT = "recursive-component-style";
const _STYLE_STATIC_COMPUTE = "recursive-static-style";
const _DOM_WILL_RENDER = "recursive-will-render";
const _DOM_DID_RENDER = "recursive-did-render";
const _DOM_WILL_UPDATE = "recursive-will-update";
const _DOM_DID_UPDATE = "recursive-did-update";
const _BATCHING_STARTED = "recursive-event-is-executing";
const _BATCHING_ENDED = "recursive-event-finished";

const EVENTS = {
     _BATCHING_ENDED,
     _BATCHING_STARTED,
     _DOM_DID_RENDER,
     _DOM_DID_UPDATE,
     _DOM_WILL_RENDER,
     _DOM_WILL_UPDATE,
     _STYLE_COMPUTE,
     _STYLE_COMPONENT,
     _STYLE_STATIC_COMPUTE,
     _UPDATE_START,
};

const UPDATE_START_EVENT = new Event(_UPDATE_START);
const STYLE_COMPUTE_EVENT = new Event(_STYLE_COMPUTE);
const DOM_WILL_RENDER = new Event(_DOM_WILL_RENDER);
const DOM_DID_RENDER = new Event(_DOM_DID_RENDER);
const DOM_WILL_UPDATE = new Event(_DOM_WILL_UPDATE);
const DOM_DID_UPDATE = new Event(_DOM_DID_UPDATE);
const BATCHING_STARTED = new Event(_BATCHING_STARTED);
const BATCHING_ENDED = new Event(_BATCHING_ENDED);

let isBusy = false;
let unhandled = false;
let timeOut = 0;

function busy() {
     if (!isBusy) isBusy = true;
}

function unBusy() {
     isBusy = false;

     if (unhandled) {
          timeOut = timeOut + 100;
          unhandled = false;
          update();
     } else {
          timeOut = 0;
     }
}

function handleConflict(event) {
     setTimeout(() => {
          if (timeOut > 300) {
               throwError("Infinite updates detected.", [
                    "The app is updating over and over.",
                    "Maybe you are updating the state too much.",
               ]);
          }
          isBusy = false;
          dispatchEvent(event);
     }, timeOut);
}

function startEvent() {
     if (StateRegistry.eventIsExecuting) return;

     try {
          dispatchEvent(BATCHING_STARTED);
     } catch (e) {
          timeOut += 100;
          handleConflict(BATCHING_STARTED);
     }
}
function endEvent() {
     try {
          dispatchEvent(BATCHING_ENDED);
     } catch (e) {
          timeOut += 100;
          handleConflict(BATCHING_ENDED);
     }
}
function sendCSSobject(csso) {
     dispatchEvent(new CustomEvent(_STYLE_COMPONENT, { detail: csso }));
}
function sendStaticStyleSheet(scsso) {
     dispatchEvent(new CustomEvent(_STYLE_STATIC_COMPUTE, { detail: scsso }));
}
function computeStyle() {
     dispatchEvent(STYLE_COMPUTE_EVENT);
}
function update() {
     try {
          if (isBusy) {
               unhandled = true;
          } else {
               busy();
               dispatchEvent(UPDATE_START_EVENT);
          }
     } catch (e) {
          timeOut += 100;
          handleConflict(UPDATE_START_EVENT);
     }
}
function willRender() {
     dispatchEvent(DOM_WILL_RENDER);
}
function didRender() {
     dispatchEvent(DOM_DID_RENDER);
     unBusy();
}
function willUpdate() {
     dispatchEvent(DOM_WILL_UPDATE);
}
function didUpdate() {
     dispatchEvent(DOM_DID_UPDATE);
     unBusy();
}

export default {
     startEvent,
     endEvent,
     sendCSSobject,
     sendStaticStyleSheet,
     computeStyle,
     update,
     willRender,
     didRender,
     willRender,
     willUpdate,
     didUpdate,
     EVENTS,
};
