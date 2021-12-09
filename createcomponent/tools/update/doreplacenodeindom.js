import CreateComponent from "../../CreateComponent.js";
import arraydiff from "./arraydiff.js";

/**
 * Replace a dom node (component.children) with a new one.
 * @param {CreateComponent | string} component - current component
 * @param {CreateComponent | string} newComponent - new component
 * @param {number} index - the index of new component's child to be replaced
 * @used {@link arraydiff}
 */
export default (index, component, newComponent) => {
     if (component.children[index].$beforeDestroyed) component.children[index]?.$beforeDestroyed();

     component.domInstance.childNodes[index].replaceWith(
          newComponent.children[index].$$createcomponent
               ? newComponent.children[index].render()
               : newComponent.children[index]
     );

     if (component.children[index].$onDestroyed) component.children[index].$onDestroyed();

     if (newComponent.children[index].$onCreated) newComponent.children[index]?.$onCreated();
};
