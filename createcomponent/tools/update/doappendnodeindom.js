import CreateComponent from "../../CreateComponent.js";
import updatechildren from "./updatechildren.js";

/**
 * Append new component's child at the given index to component's dom instance.
 * @param {CreateComponent | string} component - current component
 * @param {CreateComponent | string} newComponent - new component
 * @param {number} index - the index of new component's child to be appended
 * @used {@link updatechildren}
 */
export default (index, component, newComponent) => {
     component.domInstance.append(
          newComponent.children[index].$$createcomponent
               ? newComponent.children[index].render()
               : newComponent.children[index]
     );

     if (newComponent.children[index].$$createcomponent) newComponent.children[index].$onCreated();
};
