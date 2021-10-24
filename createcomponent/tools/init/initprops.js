import propstoattributes from "../../../vdom/props/propstoattributes.js";

/**
 * @param component component to be initi
 */
export default (component, props) => {
     for (var prop in props) {
          if (props[prop] !== undefined) {
               if (propstoattributes[prop]) {
                    component[propstoattributes[prop]] = props[prop];
               }
          }
     }
};
