function InvalidClassName(className, message) {
     throw (() => {
          const error = new Error(`"${className}" ${message}`);
          error.name = "STYLE";
          console.warn(`"${className}" ${message}`);
          return error;
     })();
}

/**
 * Check if the give class name is valid as a class
 * @param classname input
 */
export default (classname) => {
     return !classname
          ? true
          : /^[a-zA-Z]([a-zA-Z0-9]|(-))+$/.test(classname)
          ? true
          : InvalidClassName(classname, "is not a valid class name.");
};
