import CreateComponent from "./CreateComponent.js";

const CreateTextNode = (text) => {
     const textnode = new CreateComponent({ tag: "p", children: [] });

     textnode.text = text;

     textnode.tag = "#text";

     textnode.render = () => {
          const htmlElement = document.createTextNode(textnode.text);

          textnode.domInstance = htmlElement;

          return htmlElement;
     };

     textnode.update = (newComponent) => {
          if (newComponent.tag !== textnode.tag) {
               textnode.$replaceInDOM(newComponent);
          } else {
               if (textnode.text !== newComponent.text) {
                    textnode.domInstance.data = newComponent.text;
               }

               newComponent.domInstance = textnode.domInstance;
          }
     };

     return textnode;
};

export default CreateTextNode;
