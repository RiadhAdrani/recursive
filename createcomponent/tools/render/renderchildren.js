import childrentype from "../childrentype.js";
import childtype from "../childtype.js";

/**
 * Render children into the htmlElement
 * @param children children to be injected
 * @param render htmlElement
 */
export default (children, render) => {
     if (childrentype(children)) {
          children.forEach((child) => {
               render.append(child.$$createcomponent ? child.render() : child);
          });
     } else {
          render.append(children.$$createcomponent ? children.render() : children);
     }
};
