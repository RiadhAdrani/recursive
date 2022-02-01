const INFO = "info";
const LINE = "line";
const FUNCTION = "function";
const STEP = "step";
const WARNING = "warning";
const ERROR = "error";

const VDOM = "vdom";
const DOM = "dom";
const ATTRIBUTE = "attributes";
const STYLE = "style";
const EVENT = "event";
const HOOK = "hook";

const RENDER = "render";
const UPDATE = "update";

export default class RecursiveLogger {
     constructor() {
          this.level = {
               info: false,
               line: false,
               function: false,
               step: false,
               warning: false,
               error: false,
          };

          this.type = {};
     }

     changeOptions(param) {
          this.options = param;
     }

     log(text, condition, type, level) {
          if (!condition) return;
     }
}
