import CreateComponent from "../CreateComponent.js";

function ThrowCheckError(msg) {
     const e = new Error(`Check Failed => ${msg}`);
     throw e;
}

export default {
     /**
      * Return whether a component is a create-component or plain text
      * @param component child
      */
     isComponent: (component) => {
          return component instanceof CreateComponent;
     },
     /**
      * Return wether children is an array or not.
      * @param children component.children
      */
     isArrayOfComponents(children) {
          return Array.isArray(children);
     },
     /**
      * Check if the give class name is valid as a class
      * @param classname input
      */
     isValidClassName: (classname) => {
          function InvalidClassName(className, message) {
               throw (() => {
                    const error = new Error(`"${className}" ${message}`);
                    error.name = "STYLE";
                    console.warn(`"${className}" ${message}`);
                    return error;
               })();
          }

          return !classname
               ? true
               : /^[a-zA-Z]([a-zA-Z0-9]|(-))+$/.test(classname)
               ? true
               : ThrowCheckError(`"${classname}" is not a valid className.`);
     },
};
