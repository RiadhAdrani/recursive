export default (component, style) => {
     if (style) {
          if (style.className) {
               if (!component.className) {
                    component.className = style.className;
               } else {
                    component.className = `${className} ${style.className}`;
               }
          }
     }
};
