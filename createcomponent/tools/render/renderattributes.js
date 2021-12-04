import applyinlinestyle from "../applystyle/applyinlinestyle.js";
import attributes from "../../../vdom/props/attributes.js";

/**
 * Apply component attributes into the rendered element.
 * @param component CreateComponent
 * @param render htmlElement
 */
export default (component, render) => {
     for (let p in component.props) {
          render[attributes[p]] = component.props[p];
     }

     if (component.inlineStyle) {
          applyinlinestyle(component.inlineStyle, render.style);
     }
};
