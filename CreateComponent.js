import applystylesheet from "./createcomponent/applystylesheet.js";
import attributes from "./createcomponent/attributes.js";
import events from "./createcomponent/events.js";
import findElementByKey from "./createcomponent/findElementByKey.js";
import initchildren from "./createcomponent/initchildren.js";
import initstyle from "./createcomponent/initstyle.js";
import keying from "./createcomponent/keying.js";
import renderchildren from "./createcomponent/renderchildren.js";
import updateattributes from "./createcomponent/updateattributes.js";
import updatechildren from "./createcomponent/updatechildren.js";
import updateevents from "./createcomponent/updateevents.js";
import updatestyle from "./createcomponent/updatestyle.js";
import InlineSelector from "./InlineSelector.js";

class CreateComponent {
     constructor({
          tag,
          children,
          className,
          id,
          inlineStyle = InlineSelector({}),
          events,
          key,
          value,
          style,
          src,
          alt,
          placeholder,
          type,
          name,
          min,
          max,
          autofocus,
          cols,
          dirname,
          disabled,
          form,
          maxLength,
          readOnly,
          required,
          rows,
          wrap,
          beforeCreated,
          onCreated,
          beforeDestroyed,
          onDestroyed,
          onUpdated,
     }) {
          if (!tag) {
               throw "tag cannot be empty";
          }

          // HTML Attributes
          this.tag = tag;
          this.className = className;
          this.src = src;
          this.id = id;
          this.inlineStyle = inlineStyle;
          this.style = style;
          this.key = key;
          this.value = value;
          this.alt = alt;
          this.placeholder = placeholder;
          this.type = type;
          this.name = name;
          this.min = min;
          this.max = max;
          this.autofocus = autofocus;
          this.cols = cols;
          this.dirname = dirname;
          this.disabled = disabled;
          this.form = form;
          this.maxLength = maxLength;
          this.readOnly = readOnly;
          this.required = required;
          this.rows = rows;
          this.wrap = wrap;

          // Children
          this.children = [];

          // Events
          this.events = events;

          // Component Lifecycle
          this.onCreated = onCreated;
          this.onDestroyed = onDestroyed;
          this.onUpdated = onUpdated;
          this.beforeCreated = beforeCreated;
          this.beforeDestroyed = beforeDestroyed;

          initstyle(this, style);

          initchildren(this, children);

          this.keying();
     }

     render() {
          const render = document.createElement(this.tag);

          // add attributes
          attributes(this, render);

          // add events
          events(this, render);

          // inject children inside the rendered element
          renderchildren(this.children, render);

          if (this.beforeCreated) {
               // this life cycle method is not very useful and may cause weird behaviour when trying to update the UI
               // this.beforeCreated();
          }

          return render;
     }

     update(newComponent) {
          let didUpdate = false;

          const htmlElement = findElementByKey(this, null);

          if (!htmlElement) {
               throw "Component not found inside document: Report a bug to https://github.com/RiadhAdrani/recursive";
          }

          // check if the element to compare with is a string
          if (typeof newComponent === "string") {
               this.onBeforeDestroyed();
               htmlElement.replaceWith(newComponent);
               this.onDestroyed();
               return;
          }

          // check if the elements have the same tag
          if (this.tag !== newComponent.tag) {
               // Execute Lifecycle Method
               this.onBeforeDestroyed();
               htmlElement.replaceWith(newComponent.render());
               newComponent.created();

               // Execute Lifecycle Method
               this.destroyed();
               return;
          }

          // update inline style
          didUpdate = updatestyle(htmlElement.style, this.inlineStyle, newComponent.inlineStyle);

          // update element attribute
          didUpdate = updateattributes(this, newComponent, htmlElement);

          // Execute update lifecycle method
          if (didUpdate) this.updated();

          // update events
          updateevents(newComponent, htmlElement);

          // update children
          updatechildren(this, newComponent, htmlElement);
     }

     // apply keys to elements
     keying() {
          keying(this);
     }

     // execute onUpdate lifecycle method
     updated() {
          if (this.onUpdated) this.onUpdated();
     }

     // execute onCreated lifecycle methid
     created() {
          if (this.onCreated) this.onCreated();

          if (this.children) {
               this.children.forEach((child) => {
                    if (child.render) {
                         child.created();
                    }
               });
          }
     }

     // execute onDestroyed lifecycle method
     destroyed() {
          if (this.onDestroyed) return this.onDestroyed();
          else return false;
     }

     // execute beforedestroyed lifecycle method
     onBeforeDestroyed() {
          if (this.beforeDestroyed) return this.beforeDestroyed();
          return false;
     }

     // add external style
     addExternalStyle() {
          applystylesheet(this);
     }
}

export default CreateComponent;
