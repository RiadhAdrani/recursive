import initstyle from "../../createcomponent/tools/initstyle.js";
import proptoselector from "../../vdom/props/proptoselector.js";
import aconvert from "./abstractedconvert/aconvert.js";
import aconvertmediaqueries from "./abstractedconvert/aconvertmediaqueries.js";

export default (component, style) => {
     if (style.className) {
          const output = {
               className: style.className,
          };

          for (let s in style) {
               if (proptoselector.hasOwnProperty(s)) {
                    output[s] = aconvert(style[s], output);
               }
          }

          if (style.Queries) {
               output.mediaQueries = aconvertmediaqueries(style.Queries);
          }

          component.style = output;
          initstyle(component, output);
     }
};
