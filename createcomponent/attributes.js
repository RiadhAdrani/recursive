import applyinlinestyle from "./applyinlinestyle.js";

export default (component, render) => {
     // add attributes
     if (component.placeholder) render.placeholder = component.placeholder;
     if (component.src) render.src = component.src;
     if (component.alt) render.alt = component.alt;
     if (component.type) render.type = component.type;
     if (component.name) render.name = component.name;
     if (component.key) render.key = component.key;
     if (component.max) render.max = component.max;
     if (component.min) render.min = component.min;
     if (component.id) render.id = component.id;
     if (component.autofocus) render.autofocus = component.autofocus;
     if (component.cols) render.cols = component.cols;
     if (component.dirname) render.dirname = component.dirname;
     if (component.disabled) render.disabled = component.disabled;
     if (component.form) render.form = component.form;
     if (component.maxLength) render.maxlength = component.maxLength;
     if (component.readOnly) render.readonly = component.readOnly;
     if (component.required) render.required = component.required;
     if (component.rows) render.rows = component.rows;
     if (component.wrap) render.wrap = component.wrap;
     if (component.onCreated) render.onCreated = component.onCreated;
     if (component.onDestroyed) render.onDestroyed = component.onDestroyed;
     if (component.onUpdated) render.onUpdated = component.onUpdated;
     if (component.value) render.value = component.value;

     // add classes
     if (component.className) render.className = component.className;

     // apply inline style
     if (component.inlineStyle) {
          applyinlinestyle(component.inlineStyle, render.style);
     }
};
