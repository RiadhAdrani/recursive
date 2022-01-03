import CreateComponent from "./CreateComponent.js";
import HandleDOM from "./tools/HandleDOM.js";

const CreateTextNode = (text) => {
     const textnode = new CreateComponent({ tag: "p", children: [] });

     textnode.text = text;

     textnode.tag = "a-text-node";

     textnode.render = () => {
          const htmlElement = document.createTextNode(textnode.text);

          textnode.domInstance = htmlElement;

          return htmlElement;
     };

     textnode.update = (newComponent) => {
          if (newComponent.tag !== textnode.tag) {
               HandleDOM.replaceComponentInDOM(textnode, newComponent);
          } else {
               textnode.domInstance.data = newComponent.text;
               newComponent.domInstance = textnode.domInstance;
          }
     };

     return textnode;
};

export default CreateTextNode;
