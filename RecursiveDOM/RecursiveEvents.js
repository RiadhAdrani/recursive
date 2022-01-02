const update = new Event("recursive-update");
const computeStyle = new Event("recursive-compute-style");
const willRender = new Event("recursive-will-render");
const didRender = new Event("recursive-did-render");
const willUpdate = new Event("recursive-will-update");
const didUpdate = new Event("recursive-did-update");

export default {
     sendCSSobject: function (csso) {
          dispatchEvent(new CustomEvent("recursive-component-style", { detail: csso }));
     },
     sendStaticStyleSheet: function (scsso) {
          dispatchEvent(new CustomEvent("recursive-static-style", { detail: scsso }));
     },
     computeStyle: function () {
          dispatchEvent(computeStyle);
     },
     update: function () {
          dispatchEvent(update);
     },
     willRender: function () {
          dispatchEvent(willRender);
     },
     didRender: function () {
          dispatchEvent(didRender);
     },
     willUpdate: function () {
          dispatchEvent(willUpdate);
     },
     didUpdate: function () {
          dispatchEvent(didUpdate);
     },
};
