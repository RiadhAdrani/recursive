import PropList from "../../RecursiveDOM/PropList.js";

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

          for (let prop in component.props) {
               if (PropList.Attributes[prop] && !newComponent.props[prop]) {
                    render[prop] = "";
               }
          }

          return didUpdate;
     },
     /**
      * Update component's children
      * @param component old component
      * @param newComponent new component
      * @param render rendered htmlElement
      */
     children: (component, newComponent, render) => {
          function compareEqualChildren() {
               for (let i = 0; i < component.children.length; i++) {
                    component.children[i].update(newComponent.children[i]);
               }
          }

          if (component.children.length === newComponent.children.length) {
               compareEqualChildren();
          }
          // if component.children are greater than newComponent.children
          else if (component.children.length > newComponent.children.length) {
               while (component.children.length > newComponent.children.length) {
                    component.children.pop().$removeFromDOM();
               }
               compareEqualChildren();
          }
          // if component.children are less than newComponent.children
          else {
               for (let i = component.children.length; i < newComponent.children.length; i++) {
                    newComponent.children[i].$appendInDOM(component);
               }
               compareEqualChildren();
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

               for (let event in newComponent.events) {
                    if (!render.events[event]) {
                         render.addEventListener(PropList.Events[event].listener, (e) => {
                              render.events[event](e);
                         });
                    }
                    updateEvent(event);
               }

               for (let event in render.events) {
                    if (!newComponent.events[event]) {
                         render.events[event] = () => {};
                    }
               }
          } else {
               render.events = {};
          }
     },
};
