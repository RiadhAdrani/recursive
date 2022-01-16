import RecursiveDOM from "../RecursiveDOM/RecursiveDOM.js";

import Init from "./tools/Init.js";
import Render from "./tools/Render.js";
import Update from "./tools/Update.js";
import Style from "./tools/Style.js";
import RecursiveEvents from "../RecursiveDOM/RecursiveEvents.js";

function ThrowComponentError(msg) {
     const e = new Error(`Failed to create component => ${msg}`);
     throw e;
}

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
               ThrowComponentError("tag property is missing.");
          }

          // CreateComponent specific props
          this.$$createcomponent = "create-component";

          // HTML Attributes
          this.tag = tag;

          this.props = {};

          // props
          if (className) this.className = className;
          if (style) this.style = style;
          if (inlineStyle) this.inlineStyle = inlineStyle;

          Init.className(this, style);

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

          if (!htmlElement.tagName) {
               ThrowComponentError(
                    "Component not found inside document : This error should not happen : Report a bug to https://github.com/RiadhAdrani/recursive"
               );
          }

          // FLAGS
          // flags.forceRerender
          // Just rerender the component
          if (this.flags.forceRerender === true) {
               this.$replaceInDOM(newComponent);
               return;
          }

          // check if the new element have a different tag
          if (this.tag !== newComponent.tag) {
               this.$replaceInDOM(newComponent);
               return;
          }

          // update events
          Update.events(newComponent, htmlElement);

          // update inline style
          const inlineStyleDidUpdate = Style.updateInline(this, newComponent);

          // update class names
          if (this.className !== newComponent.className) {
               if (newComponent.className) {
                    htmlElement.className = newComponent.className;
               } else {
                    htmlElement.className = "";
               }
          }

          // update attributes
          const attributesDidUpdate = Update.attributes(this, newComponent, htmlElement);

          // update children
          Update.children(this, newComponent, htmlElement);

          // check if there is any change
          didUpdate = inlineStyleDidUpdate || attributesDidUpdate ? true : false;

          // Execute update lifecycle method
          didUpdate ? this.$onUpdated() : "";

          newComponent.domInstance = this.domInstance;
     }

     // LIFE CYCLE METHODS
     // ------------------------------------------------------------------------------------------------------

     /**
      * Allow the user to execute custom actions if the current component was just updated.
      * @param {CreateComponent | string} oldComponent - current component
      * @param {CreateComponent | string} newComponent - the new component
      */
     $onUpdated() {
          if (typeof this.hooks.onUpdated === "function") {
               RecursiveEvents.startEvent();
               this.hooks.onUpdated(this.domInstance);
               RecursiveEvents.endEvent();
          }
     }

     /**
      * Allow the user to execute custom actions when the component has been created.
      */
     $onCreated() {
          if (typeof this.hooks.onCreated === "function") {
               RecursiveEvents.startEvent();
               this.hooks.onCreated(this.domInstance);
               RecursiveEvents.endEvent();
          }

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
          if (typeof this.hooks.onDestroyed === "function") {
               RecursiveEvents.startEvent();
               this.hooks.onDestroyed(this);
               RecursiveEvents.endEvent();
          }
     }

     /**
      * Allow the user to execute custom actions just before the destruction of the component.
      */
     $beforeDestroyed() {
          if (typeof this.hooks.beforeDestroyed === "function") {
               RecursiveEvents.startEvent();
               this.hooks.beforeDestroyed(this.domInstance);
               RecursiveEvents.endEvent();
          }
     }

     // DOM MANIPULATION METHODS
     // ------------------------------------------------------------------------------------------------------

     /**
      * remove the current dom instance
      */
     $removeFromDOM() {
          this.$beforeDestroyed();
          this.domInstance.remove();
          this.$onDestroyed();
     }

     /**
      * replace the current dom instance with a newly created one
      * @param {CreateComponent} newComponent component to render
      */
     $replaceInDOM(newComponent) {
          this.$beforeDestroyed();
          this.domInstance.replaceWith(newComponent.render());
          this.$onDestroyed();
          newComponent.$onCreated();
     }

     /**
      * inject the recursive component into the
      * @param {CreateComponent} parentComponent
      */
     $appendInDOM(parentComponent) {
          parentComponent.domInstance.append(this.render());
          this.$onCreated();
     }

     // STYLING
     // ------------------------------------------------------------------------------------------------------

     /**
      * Send the `styleSheet` object to the RecursiveDOM to be processed.
      */
     addExternalStyle() {
          RecursiveEvents.sendCSSobject({ ...this.style });

          if (this.children) {
               this.children.forEach((child) => {
                    if (child.render) {
                         child.addExternalStyle();
                    }
               });
          }
     }
}

export default CreateComponent;
