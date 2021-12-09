import CreateComponent from "../../CreateComponent.js";
import updatechildren from "./updatechildren.js";

/**
 * Add new component children in the dom instance.
 * @param {CreateComponent | string} component - current component
 * @param {CreateComponent | string} newComponent - new component
 * @used {@link updatechildren}
 */
export default (component, newComponent) => {
     newComponent.children.forEach((child) => {
          component.domInstance.append(child.render ? child.render() : child);
          child?.$onCreated();
     });
};
