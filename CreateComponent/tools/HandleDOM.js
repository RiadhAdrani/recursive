import CreateComponent from "../CreateComponent.js";

export default {
     /**
      * Add new component children in the dom instance.
      * @param {CreateComponent | string} component - current component
      * @param {CreateComponent | string} newComponent - new component
      */
     replaceChildrenInDOM: (component, newComponent) => {
          newComponent.children.forEach((child) => {
               component.domInstance.append(child.render ? child.render() : child);
               child?.$onCreated();
          });
     },
     /**
      * Append new component's child at the given index to component's dom instance.
      * @param {CreateComponent | string} component - current component
      * @param {CreateComponent | string} newComponent - new component
      * @param {number} index - the index of new component's child to be appended
      */
     appendIndexedChildInDOM: (index, component, newComponent) => {
          component.domInstance.append(
               newComponent.children[index].$$createcomponent
                    ? newComponent.children[index].render()
                    : newComponent.children[index]
          );

          // execute onCreated hook
          if (newComponent.children[index].$$createcomponent)
               newComponent.children[index].$onCreated();
     },
     /**
      * Remove component's child at the given index from the dom instance.
      * @param {CreateComponent | string} component - current component
      * @param {number} index - the index of the component's child to be removed
      */
     removeIndexedChildFromDOM: (index, component) => {
          // execute beforeDestroyed hook
          if (component.children[index].$beforeDestroyed) {
               component.children[index].$beforeDestroyed();
          }

          component.domInstance.childNodes[index].remove();

          // execute onDestroyed hook
          if (component.children[index].$onDestroyed) {
               component.children[index].$onDestroyed();
          }
     },
     /**
      * Replace a dom node (component.children) with a new one.
      * @param {CreateComponent | string} component - current component
      * @param {CreateComponent | string} newComponent - new component
      * @param {number} index - the index of new component's child to be replaced
      */
     replaceIndexedChildInDOM: (index, component, newComponent) => {
          // execute beforeDestroyed hook
          if (component.children[index].$beforeDestroyed)
               component.children[index]?.$beforeDestroyed();

          component.domInstance.childNodes[index].replaceWith(
               newComponent.children[index].$$createcomponent
                    ? newComponent.children[index].render()
                    : newComponent.children[index]
          );

          // execute onDestroyed hook
          if (component.children[index].$onDestroyed) component.children[index].$onDestroyed();

          // execute onCreated hook
          if (newComponent.children[index].$onCreated) newComponent.children[index]?.$onCreated();
     },
     /**
      * replace the current component's dom instance with the new one.
      * @param {CreateComponent | string} component - current component
      * @param {CreateComponent | string} newComponent - new component
      * @used {@link CreateComponent}
      */
     replaceComponentInDOM: (component, newComponent) => {
          // execute beforeDestroyed hook
          if (component.$beforeDestroyed) component?.$beforeDestroyed();

          component.domInstance.replaceWith(
               newComponent.$$createcomponent ? newComponent.render() : newComponent
          );

          // execute onDestroyed hook
          if (component.$onDestroyed) component?.$onDestroyed();

          // execute onCreated hook
          if (newComponent.$onCreated) newComponent?.$onCreated();
     },
};
