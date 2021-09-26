export default (component) => {
     if (typeof component.children !== "string") {
          if (component.children.render) {
               component.children.key = `${component.key}0`;
          } else {
               component.children.forEach((child) => {
                    if (typeof child !== "string") {
                         child.key = `${component.key}${component.children.indexOf(child)}`;
                         child.keying();
                    }
               });
          }
     }
};
