import initstyle from "../createcomponent/initstyle.js";
import proptoselector from "../vdom/proptoselector.js";
import aconvert from "./abstractedconvert/aconvert.js";

export default (component, style) => {
     const output = {
          className: style.className,
     };

     for (let s in style) {
          if (proptoselector.hasOwnProperty(s)) {
               output[s] = aconvert(style[s], output);
          }
     }

     component.style = output;
     initstyle(component, output);
};
