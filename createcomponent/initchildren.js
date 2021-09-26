export default (component, children) => {
     if (children) {
          if (["number", "string", "boolean"].includes(typeof children) && !children.render) {
               component.children = [`${children}`];
          } else if (children.render) {
               component.children = [children];
          } else {
               for (let i = 0; i < children.length; i++) {
                    if (!children[i]) continue;
                    if (!["number", "string", "boolean"].includes(typeof children[i])) {
                         component.children.push(children[i]);
                    } else {
                         let textNode = children[i];
                         for (let j = i + 1; j < children.length; j++) {
                              if (["number", "string", "boolean"].includes(typeof children)) {
                                   break;
                              } else {
                                   textNode += children[j];
                                   i++;
                              }
                         }
                         component.children.push(textNode);
                    }
               }
          }
     } else component.children = "";
};
