import flags from "../../../vdom/props/flags.js";

/**
 * @param component - component
 * @param list - input list
 */
export default (component, list) => {
     for (let f in list) {
          if (flags[f]) {
               if (!component.flags) {
                    component.flags = {};
               }
               component.flags[f] = list[f];
          }
     }
};
