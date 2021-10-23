import hooksList from "../../vdom/props/hooks.js";

/**
 * @param component component to be initi
 * @param hooks
 */
export default (component, hooks) => {
     for (var hook in hooks) {
          if (hooks[hook] !== undefined) {
               if (hooksList[hook]) {
                    component[hook] = hooks[hook];
               }
          }
     }
};
