import hooksList from "../../../vdom/props/hooks.js";

function InvalidHook(hook, message) {
     const error = new Error(`${hook} ${message}`);
     error.name = "HOOKS";
     console.warn(`${hook} ${message}`);
     throw error;
}

/**
 * @param component component to be initi
 * @param hooks
 */
export default (component, hooks) => {
     for (var hook in hooks) {
          if (hooks[hook] !== undefined) {
               if (hooksList[hook]) {
                    if (typeof hooks[hook] === "function") {
                         component[hook] = hooks[hook];
                    } else {
                         InvalidHook(hook, "is not a function.");
                    }
               } else {
                    InvalidHook(hook, "is not a valid hook name.");
               }
          }
     }
};
