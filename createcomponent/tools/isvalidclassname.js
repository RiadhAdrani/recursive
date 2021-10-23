/**
 * Check if the give class name is valid as a class
 * @param classname input
 */
export default (classname) => {
     return !classname ? true : /^[a-zA-Z]([a-zA-Z0-9]|(-))+$/.test(classname) ? true : false;
};
