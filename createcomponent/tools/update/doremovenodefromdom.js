import CreateComponent from "../../CreateComponent.js";
import updatechildren from "./updatechildren.js";

/**
 * Remove component's child at the given index from the dom instance.
 * @param {CreateComponent | string} component - current component
 * @param {number} index - the index of the component's child to be removed
 * @used {@link updatechildren}
 */
export default (index, component) => {
     if (component.children[index].$beforeDestroyed) {
          component.children[index].$beforeDestroyed();
     }

     component.domInstance.childNodes[index].remove();

     if (component.children[index].$onDestroyed) {
          component.children[index].$onDestroyed();
     }
};
