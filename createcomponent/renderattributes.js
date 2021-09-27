import applyinlinestyle from "./applyinlinestyle.js";
import attributes from "./attributes.js";

export default (component, render) => {
     function renderAttr(attr) {
          if (component[attr]) render[attr] = component[attr];
     }

     attributes.forEach((attr) => {
          renderAttr(attr);
     });

     if (component.key) render.key = component.key;

     if (component.inlineStyle) {
          applyinlinestyle(component.inlineStyle, render.style);
     }
};
