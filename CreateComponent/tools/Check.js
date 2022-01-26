import { throwError } from "../../RecursiveDOM/RecursiveError.js";
import CreateComponent from "../CreateComponent.js";

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
          return !classname
               ? true
               : /^[a-zA-Z]([a-zA-Z0-9]|(-))+$/.test(classname)
               ? true
               : throwError(`${classname} is not a valid className`, [
                      'Class name can only include alphaneumerical characters and "-".',
                      "Class name should not contain spaces.",
                 ]);
     },
};
