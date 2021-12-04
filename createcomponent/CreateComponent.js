import applystylesheet from "./tools/applystyle/applystylesheet.js";

import keying from "./tools/keying.js";

import initchildren from "./tools/init/initchildren.js";
import initclassname from "./tools/init/initclassname.js";
import initprops from "./tools/init/initprops.js";
import inithooks from "./tools/init/inithooks.js";
import initevents from "./tools/init/initevents.js";

import renderattributes from "./tools/render/renderattributes.js";
import renderevents from "./tools/render/renderevents.js";
import renderchildren from "./tools/render/renderchildren.js";

import updateattributes from "./tools/update/updateattributes.js";
import updatechildren from "./tools/update/updatechildren.js";
import updateevents from "./tools/update/updateevents.js";
import updatestyle from "./tools/update/updatestyle.js";
import initflags from "./tools/init/initflags.js";

/**
 * ## CreateComponent
 * Create Web Components for the RecursiveDOM.
 * @see {@link RecursiveDOM}
 */
class CreateComponent {
     /**
      * Initiate a new component
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
      * @param {Function} param.hooks.onCreated executes when the component is rendered in the DOM.
      * @param {Function} param.hooks.onUpdated executes when the component has been partially changed.
      * @param {Function} param.hooks.onDestroyed executes when the component has been destroyed.
      * @param {Function} param.hooks.beforeDestroyed executed before the component get destroyed.
      */
     constructor({
          tag,
          children,
          events,
          renderIf = true,
          className,
          style,
          inlineStyle,
          props,
          flags,
          hooks = {
               onCreated: undefined,
               beforeDestroyed: undefined,
               onDestroyed: undefined,
               onUpdated: undefined,
          },
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
          this.renderIf = renderIf;

          // HTML Attributes
          this.tag = tag;

          // props
          if (className) this.className = className;
          if (style) this.style = style;
          if (inlineStyle) this.inlineStyle = inlineStyle;

          initclassname(this, style);

          this.props = {};
          initprops(this, { ...props, className: this.className });

          // Children
          this.children = [];

          initchildren(this, children);

          // dom instance
          this.domInstance = undefined;

          // Events
          this.events = {};
          initevents(this, events);

          // Lifecycle Hooks
          this.flags = {};
          inithooks(this, hooks);

          // Rendering Flags
          initflags(this, flags);

          // Keying
          // will be removed after testing domInstance
          // this.keying();
     }

     render() {
          let render = document.createElement(this.tag);

          // add attributes
          renderattributes(this, render);

          // add events
          renderevents(this, render);

          // inject children inside the rendered element
          renderchildren(this.children, render);

          render.key = this.key;

          this.domInstance = render;

          return render;
     }

     update(newComponent) {
          let didUpdate = false;

          const htmlElement = this.domInstance;

          if (!htmlElement) {
               throw "Component not found inside document: Report a bug to https://github.com/RiadhAdrani/recursive";
          }

          if (this.flags.forceRerender === true) {
               this.$beforeDestroyed();
               htmlElement.replaceWith(
                    newComponent.$$createcomponent ? newComponent.render() : newComponent
               );
               this.$onDestroyed();
               newComponent?.$onCreated();
               return;
          }

          // check if the element to compare with is a string
          if (typeof newComponent === "string") {
               this.$beforeDestroyed();
               htmlElement.replaceWith(newComponent);
               this.$onDestroyed();
               return;
          }

          // check if the elements have the same tag
          if (this.tag !== newComponent.tag) {
               // Execute Lifecycle Method
               this.$beforeDestroyed();
               htmlElement.replaceWith(newComponent.render());
               newComponent.$onCreated();

               // Execute Lifecycle Method
               this.$onDestroyed();
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

     // apply keys to elements
     keying() {
          keying(this);
     }

     // execute onUpdate lifecycle method
     $onUpdated(oldComponent, newComponent) {
          if (this.onUpdated) this.onUpdated(oldComponent, newComponent);
     }

     // execute onCreated lifecycle methid
     $onCreated() {
          if (this.onCreated) this.onCreated();

          if (this.children) {
               this.children.forEach((child) => {
                    if (child.$$createcomponent) {
                         child.$onCreated();
                    }
               });
          }
     }

     // execute onDestroyed lifecycle method
     $onDestroyed() {
          if (this.onDestroyed) this.onDestroyed();
     }

     // execute beforedestroyed lifecycle method
     $beforeDestroyed() {
          if (this.beforeDestroyed) this.beforeDestroyed();
     }

     // add external style
     addExternalStyle() {
          applystylesheet(this);
     }
}

export default CreateComponent;
