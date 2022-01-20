const updateEvent = new Event("recursive-update");
const computeStyleEvent = new Event("recursive-compute-style");
const willRenderEvent = new Event("recursive-will-render");
const didRenderEvent = new Event("recursive-did-render");
const willUpdateEvent = new Event("recursive-will-update");
const didUpdateEvent = new Event("recursive-did-update");
const eventIsExecutingEvent = new Event("recursive-event-is-executing");
const eventFinishedEvent = new Event("recursive-event-finished");

function startEvent() {
     dispatchEvent(eventIsExecutingEvent);
}
function endEvent() {
     dispatchEvent(eventFinishedEvent);
}
function sendCSSobject(csso) {
     dispatchEvent(new CustomEvent("recursive-component-style", { detail: csso }));
}
function sendStaticStyleSheet(scsso) {
     dispatchEvent(new CustomEvent("recursive-static-style", { detail: scsso }));
}
function computeStyle() {
     dispatchEvent(computeStyleEvent);
}
function update() {
     dispatchEvent(updateEvent);
}
function willRender() {
     dispatchEvent(willRenderEvent);
}
function didRender() {
     dispatchEvent(didRenderEvent);
}
function willUpdate() {
     dispatchEvent(willUpdateEvent);
}
function didUpdate() {
     dispatchEvent(didUpdateEvent);
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
};
