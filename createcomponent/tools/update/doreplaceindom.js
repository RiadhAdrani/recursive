import CreateComponent from "../../CreateComponent.js";

/**
 * replace the current component's dom instance with the new one.
 * @param {CreateComponent | string} component - current component
 * @param {CreateComponent | string} newComponent - new component
 * @used {@link CreateComponent}
 */
export default (component, newComponent) => {
     if (component.$beforeDestroyed) component?.$beforeDestroyed();

     component.domInstance.replaceWith(
          newComponent.$$createcomponent ? newComponent.render() : newComponent
     );

     if (component.$onDestroyed) component?.$onDestroyed();

     if (newComponent.$onCreated) newComponent?.$onCreated();
};
