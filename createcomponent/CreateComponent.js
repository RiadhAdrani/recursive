import RecursiveDOM from "../RecursiveDOM.js";

import applystylesheet from "./tools/applystyle/applystylesheet.js";

import keying from "./tools/keying.js";

import initchildren from "./tools/init/initchildren.js";
import initclassname from "./tools/init/initclassname.js";
import initprops from "./tools/init/initprops.js";
import inithooks from "./tools/init/inithooks.js";
import initevents from "./tools/init/initevents.js";
import initflags from "./tools/init/initflags.js";

import renderattributes from "./tools/render/renderattributes.js";
import renderevents from "./tools/render/renderevents.js";
import renderchildren from "./tools/render/renderchildren.js";

import updateattributes from "./tools/update/updateattributes.js";
import updatechildren from "./tools/update/updatechildren.js";
import updateevents from "./tools/update/updateevents.js";
import updatestyle from "./tools/update/updatestyle.js";

import replaceindom from "./tools/update/_replaceindom.js";

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

          initclassname(this, style);

          this.props = {};
          initprops(this, { ...props, className: this.className });

          // dom instance
          this.domInstance = undefined;

          // Events
          this.events = {};
          initevents(this, events);

          // Lifecycle Hooks
          this.hooks = {};
          inithooks(this, hooks);

          // Rendering Flags
          this.flags = {};
          initflags(this, flags);

          // Children
          this.children = [];
          initchildren(this, children);

          // Keying
          // will be removed after testing domInstance
          // this.keying();
     }

     /**
      * Convert the Recursive representation into a DOM element.
      * @returns {HTMLElement} DOM element.
      */
     render() {
          let render = document.createElement(this.tag);

          // add attributes
          renderattributes(this, render);

          // add events
          renderevents(this, render);

          // inject children inside the rendered element
          renderchildren(this.children, render);

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
               replaceindom(this, newComponent);
               return;
          }

          // check if the element to compare with is a string
          if (typeof newComponent === "string") {
               replaceindom(this, newComponent);
               return;
          }

          // check if the new element have a different tag
          if (this.tag !== newComponent.tag) {
               replaceindom(this, newComponent);
               return;
          }

          // update events
          updateevents(newComponent, htmlElement);

          // update inline style
          const inlineStyleDidUpdate = updatestyle(
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
          const attributesDidUpdate = updateattributes(this, newComponent, htmlElement);

          // update children
          const childrenDidChange = updatechildren(this, newComponent, htmlElement);

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
          keying(this);
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
          applystylesheet(this);
     }
}

export default CreateComponent;
