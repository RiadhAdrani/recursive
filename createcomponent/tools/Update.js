import PropList from "../../vdom/PropList.js";
import ArrayDiffing from "./ArrayDiffing.js";
import HandleDOM from "./HandleDOM.js";
import Style from "./Style.js";

export default {
     /**
      * Update component's attributes
      * @param component old component
      * @param newComponent new component
      * @param render rendered htmlElement
      */
     attributes: (component, newComponent, render) => {
          let didUpdate = false;

          function updateAttr(attr) {
               if (newComponent.props[attr]) {
                    render[attr] = newComponent.props[attr];
               } else {
                    render[attr] = "";
               }
               didUpdate = true;
          }

          for (let prop in newComponent.props) {
               if (PropList.Attributes[prop]) {
                    if (component.props[prop] !== newComponent.props[prop]) {
                         updateAttr(prop);
                    }
               }
          }

          for (let prop in component) {
               if (PropList.Attributes[prop] && !newComponent.props[prop]) {
                    render[prop] = "";
               }
          }

          Style.updateInline(newComponent.style, component.style, render);

          return didUpdate;
     },
     /**
      * Update component's children
      * @param component old component
      * @param newComponent new component
      * @param render rendered htmlElement
      */
     children: (component, newComponent, render) => {
          if (component.children.length === newComponent.children.length) {
               return ArrayDiffing(component, newComponent, render);
          }
          // if component.children are greater than newComponent.children
          else if (component.children.length > newComponent.children.length) {
               while (component.domInstance.childNodes.length > newComponent.children.length) {
                    HandleDOM.removeIndexedChildFromDOM(newComponent.children.length, component);
                    component.children.pop();
               }

               ArrayDiffing(component, newComponent, render);

               return true;
          }
          // if component.children are less than newComponent.children
          else {
               for (let i = component.children.length; i < newComponent.children.length; i++) {
                    HandleDOM.appendIndexedChildInDOM(i, component, newComponent);
               }

               return ArrayDiffing(component, newComponent, render);
          }
     },
     /**
      * Update component's Events
      * @param newComponent new component
      * @param render rendered htmlElement
      */
     events: (newComponent, render) => {
          function updateEvent(prop) {
               render.events[prop] = newComponent.events[prop];
          }

          if (newComponent.events) {
               if (!render.events) {
                    render.events = {};
               }

               for (let event in render.events) {
                    if (!newComponent.events[event]) {
                         render.events[event] = () => {};
                    }
               }

               for (let event in newComponent.events) {
                    updateEvent(event);
               }
          } else {
               render.events = {};
          }
     },
};
