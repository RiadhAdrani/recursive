import PropList from "../../vdom/PropList.js";
import Check from "./Check.js";

export default {
     /**
      * Initialize children
      * @param component CreateComponent
      * @param children input children to be initialized
      */
     children: (component, children) => {
          // if children is not null
          if (children !== null) {
               // if children is an array
               if (Array.isArray(children)) {
                    // iterate through children
                    for (let i = 0; i < children.length; i++) {
                         // skip child if null
                         if (children[i] === null) continue;

                         // throw an error if a child is an array
                         if (Check.isArrayOfComponents(children[i])) {
                              throw `[RENDER]: Child cannot be an array`;
                         }

                         // if child is a component.
                         if (Check.isComponent(children[i])) {
                              // check renderIf value
                              if (children[i].flags.renderIf !== false) {
                                   component.children.push(children[i]);
                              }
                         }
                         // else child could be rendered as a text node
                         else {
                              let textNode = children[i];

                              // merge all consecutive non-component child into one text node
                              for (let j = i + 1, l = children.length; j < l; j++) {
                                   if (Check.isComponent(children[j])) {
                                        break;
                                   } else {
                                        textNode += children[j];
                                        i++;
                                   }
                              }

                              // push text node
                              component.children.push(textNode);
                         }
                    }
               }
               // children is a single node
               else if (children !== undefined) {
                    if (children.$$createcomponent) {
                         if (children.flags.renderIf !== false) {
                              component.children = [children];
                         }
                    }
                    // child is a text node
                    else {
                         component.children = [children];
                    }
               }
               // child is a component
          }
          // no children
          else {
               component.children = [];
          }
     },
     /**
      * Add style className to the classList
      * @param component CreateComponent
      * @param style style object
      */
     className: (component, style) => {
          // if style is valid
          if (style) {
               // check if className is valid
               if (style.className) {
                    Check.isValidClassName(style.className);
                    if (!component.className) {
                         component.className = style.className;
                    } else {
                         component.className = `${component.className} ${style.className}`;
                    }
               }
          }

          if (component.className) {
               const classList = component.className.split(" ");
               for (var i = 0, j = classList.length; i < j; i++) {
                    Check.isValidClassName(classList[i]);
               }
          }
     },
     /**
      * @param {CreateComponent} component - to be initialized
      * @param {JSON} events - events to be injected
      * @throws an error whenever an event is not a function or doesn't have a valid name
      */
     events: (component, events) => {
          function InvalidEvent(event, message) {
               throw (() => {
                    const error = new Error(`${event} ${message}`);
                    error.name = "EVENTS";
                    `${event} ${message}`;
                    return error;
               })();
          }

          for (var event in events) {
               if (PropList.Events[event]) {
                    if (typeof events[event] === "function") {
                         component.events[event] = events[event];
                    } else {
                         InvalidEvent(event, "is not a function");
                    }
               } else {
                    InvalidEvent(event, "is not a valid event name.");
               }
          }
     },
     /**
      * @param component - component
      * @param list - input list
      */
     flags: (component, flags) => {
          for (let f in flags) {
               if (PropList.Flags[f]) {
                    component.flags[f] = flags[f];
               }
          }
     },
     /**
      * @param component component to be initi
      * @param hooks
      */
     hooks: (component, hooks) => {
          function InvalidHook(hook, message) {
               const error = new Error(`${hook} ${message}`);
               error.name = "HOOKS";
               console.warn(`${hook} ${message}`);
               throw error;
          }

          for (var hook in hooks) {
               if (hooks[hook] !== undefined) {
                    if (PropList.Hooks[hook]) {
                         if (typeof hooks[hook] === "function") {
                              component.hooks[hook] = hooks[hook];
                         } else {
                              InvalidHook(hook, "is not a function.");
                         }
                    } else {
                         InvalidHook(hook, "is not a valid hook name.");
                    }
               }
          }
     },
     /**
      * @param component component to be initialized
      * @param attributes list to add
      */
     attributes: (component, attributes) => {
          for (var attr in attributes) {
               if (PropList.Attributes[attr] && attributes[attr]) {
                    component.props[attr] = attributes[attr];
               }
          }
     },
};
