export default (component, newComponent, render) => {
     let didUpdate = false;

     if (component.src !== newComponent.src) {
          if (newComponent.src) {
               render.src = newComponent.src;
          } else {
               render.removeAttribute("src");
          }
          didUpdate = true;
     }

     if (component.value !== newComponent.value) {
          if (newComponent.value) {
               render.value = newComponent.value;
          } else {
               render.removeAttribute("value");
          }
          didUpdate = true;
     }

     if (component.placehrenderer !== newComponent.placehrenderer) {
          if (newComponent.placehrenderer) {
               render.placehrenderer = newComponent.placehrenderer;
          } else {
               render.removeAttribute("placehrenderer");
          }

          didUpdate = true;
     }

     if (component.alt !== newComponent.alt) {
          if (newComponent.alt) {
               render.alt = newComponent.alt;
          } else {
               render.removeAttribute("alt");
          }

          didUpdate = true;
     }

     if (component.type !== newComponent.type) {
          if (newComponent.type) {
               render.type = newComponent.type;
          } else {
               render.removeAttribute("type");
          }
          didUpdate = true;
     }

     if (component.name !== newComponent.name) {
          if (newComponent.name) {
               render.name = newComponent.name;
          } else {
               render.removeAttribute("name");
          }
          didUpdate = true;
     }

     if (component.max !== newComponent.max) {
          if (newComponent.max) {
               render.max = newComponent.max;
          } else {
               render.removeAttribute("max");
          }

          didUpdate = true;
     }

     if (component.min !== newComponent.min) {
          if (newComponent.min) {
               render.min = newComponent.min;
          } else {
               render.removeAttribute("min");
          }

          didUpdate = true;
     }

     if (component.autofocus !== newComponent.autofocus) {
          if (newComponent.autofocus) {
               render.autofocus = newComponent.autofocus;
          } else {
               render.removeAttribute("autofocus");
          }

          didUpdate = true;
     }

     if (component.cols !== newComponent.cols) {
          if (newComponent.cols) {
               render.cols = newComponent.cols;
          } else {
               render.removeAttribute("cols");
          }

          didUpdate = true;
     }

     if (component.dirname !== newComponent.dirname) {
          if (newComponent.dirname) {
               render.dirname = newComponent.dirname;
          } else {
               render.removeAttribute("dirname");
          }

          didUpdate = true;
     }

     if (component.disabled !== newComponent.disabled) {
          if (newComponent.disabled) {
               render.disabled = newComponent.disabled;
          } else {
               render.removeAttribute("disabled");
          }

          didUpdate = true;
     }

     if (component.form !== newComponent.form) {
          if (newComponent.form) {
               render.form = newComponent.form;
          } else {
               render.removeAttribute("form");
          }

          didUpdate = true;
     }

     if (component.maxLength !== newComponent.maxLength) {
          if (newComponent.maxLength) {
               render.maxlength = newComponent.maxLength;
          } else {
               render.removeAttribute("maxlength");
          }

          didUpdate = true;
     }

     if (component.readOnly !== newComponent.readOnly) {
          if (newComponent.readOnly) {
               render.readonly = newComponent.readOnly;
          } else {
               render.removeAttribute("readonly");
          }

          didUpdate = true;
     }

     if (component.required !== newComponent.required) {
          if (newComponent.required) {
               render.required = newComponent.required;
          } else {
               render.removeAttribute("required");
          }

          didUpdate = true;
     }

     if (component.rows !== newComponent.rows) {
          if (newComponent.rows) {
               render.rows = newComponent.rows;
          } else {
               render.removeAttribute("rows");
          }

          didUpdate = true;
     }

     if (component.wrap !== newComponent.wrap) {
          if (newComponent.wrap) {
               render.wrap = newComponent.wrap;
          } else {
               render.removeAttribute("wrap");
          }

          didUpdate = true;
     }

     if (component.id !== newComponent.id) {
          if (newComponent.id) {
               render.id = newComponent.id;
          } else {
               render.removeAttribute("id");
          }

          didUpdate = true;
     }

     if (component.className !== newComponent.className) {
          if (newComponent.className) {
               render.className = newComponent.className;
          } else {
               render.removeAttribute("class");
          }

          didUpdate = true;
     }

     return didUpdate;
};
