import attributes from "../../../vdom/props/attributes.js";

/**
 * @param component component to be initi
 */
export default (component, props) => {
     for (var prop in props) {
          if (attributes[prop] && props[prop]) {
               component.props[prop] = props[prop];
          }
     }
};
