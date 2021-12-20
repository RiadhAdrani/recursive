import RecursiveDOM from "../RecursiveDOM/RecursiveDOM.js";

import Init from "./tools/Init.js";
import Render from "./tools/Render.js";
import Update from "./tools/Update.js";
import HandleDOM from "./tools/HandleDOM.js";
import Style from "./tools/Style.js";

/**
 * ## CreateComponent
 * ### The modular unit to build a Recursive Web App.
 * CreateComponent is a representation of an HTML element,
 * it can update, destroy and update itself according the need of the developer.
 * Children component can be injected too, which have the same abilities as their parent,
 * and like that, the library got its name.
 * @see {@link RecursiveDOM}
 */
class CreateComponent {
     /**
      * Create a new component
      * @param {Object} param
      * @param {string} param.tag "Html tag"
      * @param {Array} param.children an array of children. A child can be of type `CreateComponent`, `string`, `boolean`, `number`. `null` value will be ignored.
      * @param {JSON} param.events event handlers.
      * @param {boolean} param.renderIf determine if the component should be rendered or not.
      * @param {string} param.className the equivalent of html classes
      * @param {JSON} param.style external style sheet
      * @param {JSON} param.inlineStyle component inline style
      * @param {JSON} param.props the equivalent of html attributes
      * @param {JSON} param.hooks define lifecycle methods for the component.
      * @param {JSON} param.flags define flags for component updating.
      * @param {Function} param.hooks define lifecycle methods.
      */
     constructor({
          tag,
          children,
          events,
          className,
          style,
          inlineStyle,
          props,
          flags,
          hooks = {},
     }) {
          // tag cannot be
          if (!tag) {
               throw (() => {
                    const error = new Error(`component tag cannot be empty.`);
                    error.name = "CREATE-COMPONENT";
                    return error;
               })();
          }

          // CreateComponent specific props
          this.$$createcomponent = "create-component";
          this.key = "0";
          // this.renderIf = renderIf;

          // HTML Attributes
          this.tag = tag;

          // props
          if (className) this.className = className;
          if (style) this.style = style;
          if (inlineStyle) this.inlineStyle = inlineStyle;

          Init.className(this, style);

          this.props = {};
          Init.attributes(this, { ...props, className: this.className });

          // dom instance
          this.domInstance = undefined;

          // Events
          this.events = {};
          Init.events(this, events);

          // Lifecycle Hooks
          this.hooks = {};
          Init.hooks(this, hooks);

          // Rendering Flags
          this.flags = {};
          Init.flags(this, flags);

          // Children
          this.children = [];
          Init.children(this, children);
     }

     /**
      * Convert the Recursive representation into a DOM element.
      * @returns {HTMLElement} DOM element.
      */
     render() {
          let render = document.createElement(this.tag);

          // add attributes
          Render.attributes(this, render);
          // renderattributes(this, render);

          // add events
          // renderevents(this, render);
          Render.events(this, render);

          // inject children inside the rendered element
          // renderchildren(this.children, render);
          Render.children(this, render);

          // render.key = this.key;

          this.domInstance = render;

          return render;
     }

     /**
      * Compare the current component with another given one and update the `DOM` if needed.
      * @param {CreateComponent | string} newComponent
      * @returns {boolean} - indicates weather the component did change or not.
      */
     update(newComponent) {
          let didUpdate = false;

          // get the dom instance of the component
          const htmlElement = this.domInstance;

          if (!htmlElement) {
               throw "Component not found inside document: Report a bug to https://github.com/RiadhAdrani/recursive";
          }

          // FLAGS
          // flags.forceRerender
          // Just rerender the component
          if (this.flags.forceRerender === true) {
               HandleDOM.replaceComponentInDOM(this, newComponent);
               // replaceindom(this, newComponent);
               return;
          }

          // check if the element to compare with is a string
          if (typeof newComponent === "string") {
               HandleDOM.replaceComponentInDOM(this, newComponent);
               //replaceindom(this, newComponent);
               return;
          }

          // check if the new element have a different tag
          if (this.tag !== newComponent.tag) {
               HandleDOM.replaceComponentInDOM(this, newComponent);
               // replaceindom(this, newComponent);
               return;
          }

          // update events
          Update.events(newComponent, htmlElement);
          // updateevents(newComponent, htmlElement);

          // update inline style
          const inlineStyleDidUpdate = Style.updateInlineExcept(
               htmlElement.style,
               this.inlineStyle,
               newComponent.inlineStyle
          );

          // update class names
          if (this.className !== newComponent.className) {
               if (newComponent.className) {
                    htmlElement.className = newComponent.className;
               } else {
                    htmlElement.className = "";
               }
          }

          // update attributes
          const attributesDidUpdate = Update.attributes(this, newComponent, htmlElement); //updateattributes(this, newComponent, htmlElement);

          // update children
          const childrenDidChange = Update.children(this, newComponent, htmlElement); //updatechildren(this, newComponent, htmlElement);

          // check if there is any change
          didUpdate =
               inlineStyleDidUpdate || attributesDidUpdate || childrenDidChange ? true : false;

          // Execute update lifecycle method
          if (didUpdate) this.$onUpdated(this, newComponent);

          newComponent.domInstance = this.domInstance;

          return didUpdate;
     }

     /**
      * @deprecated
      * assign a key to the current component, and its children.
      */
     keying() {
          // keying(this);
     }

     /**
      * Allow the user to execute custom actions if the current component was just updated.
      * @param {CreateComponent| string} oldComponent - current component
      * @param {CreateComponent | string} newComponent - the new component
      */
     $onUpdated(oldComponent, newComponent) {
          if (this.onUpdated) this.onUpdated(oldComponent, newComponent);
     }

     /**
      * Allow the user to execute custom actions when the component has been created.
      */
     $onCreated() {
          if (this.hooks.onCreated) this.hooks.onCreated();

          if (this.children) {
               this.children.forEach((child) => {
                    if (child.$$createcomponent) {
                         child.$onCreated();
                    }
               });
          }
     }

     /**
      * Allow the user to execute custom actions when the component has been destroyed.
      */
     $onDestroyed() {
          if (this.hooks.onDestroyed) this.hooks.onDestroyed();
     }

     /**
      * Allow the user to execute custom actions just before the destruction of the component.
      */
     $beforeDestroyed() {
          if (this.hooks.beforeDestroyed) this.hooks.beforeDestroyed();
     }

     /**
      * Send the `styleSheet` object to the RecursiveDOM to be processed.
      */
     addExternalStyle() {
          Style.applySheet(this);
     }
}

export default CreateComponent;
