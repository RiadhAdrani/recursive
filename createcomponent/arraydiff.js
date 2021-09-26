export default (component, newComponent, render) => {
     for (let i = 0; i < component.children.length; i++) {
          if (
               typeof component.children[i] === "string" &&
               typeof newComponent.children[i] === "string"
          ) {
               //// console.log(`children-${i} are strings`);
               // case not equal strings
               if (component.children[i].toString() !== newComponent.children[i].toString()) {
                    //// console.log(`children-${i} are not the same strings`);

                    if (render.childNodes) {
                         render.childNodes[i].nodeValue = newComponent.children[i];
                    }
               }
          }
          // case children is string, new is child
          else if (typeof component.children[i] === "string" && newComponent.children[i].render) {
               // console.log(`children-${i} are string & child`);
               render.childNodes.forEach((child, key) => {
                    if (key == i) {
                         child.replaceWith(newComponent.children[i].render());
                         child.created();
                    }
               });
          }
          // case children is child, new is string
          else if (component.children[i].render && typeof newComponent.children[i] === "string") {
               //// console.log(`children-${i} are child and string`);
               //// console.log("child node to be replaced: ");

               component.children[i].onBeforeDestroyed();

               render.childNodes.forEach((child, key) => {
                    if (key == i) {
                         child.replaceWith(newComponent.children[i]);
                    }
               });

               component.children[i].destroyed();
          }
          // case children is child, new is child
          else {
               //// console.log(`children-${i} are child and child`);
               component.children[i].update(newComponent.children[i]);
          }
     }
};
