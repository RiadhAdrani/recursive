/**
 * Return whether a child is a component or plain text
 * @param child child
 * @returns true if child is a component, false otherwise.
 */
export default (child) => {
     return !["number", "string", "boolean"].includes(typeof child);
};
