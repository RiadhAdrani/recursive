import findElementByKey from "./tools/findElementByKey.js";

import applystylesheet from "./tools/applystylesheet.js";

import keying from "./tools/keying.js";

import initchildren from "./tools/init/initchildren.js";
import initclassname from "./tools/init/initclassname.js";
import initprops from "./tools/init/initprops.js";
import inithooks from "./tools/init/inithooks.js";

import renderattributes from "./tools/render/renderattributes.js";
import renderevents from "./tools/render/renderevents.js";
import renderchildren from "./tools/render/renderchildren.js";

import updateattributes from "./tools/update/updateattributes.js";
import updatechildren from "./tools/update/updatechildren.js";
import updateevents from "./tools/update/updateevents.js";
import updatestyle from "./tools/update/updatestyle.js";

class CreateComponent {
     constructor({
          tag,
          children,
          events,
          renderIf = true,
          className,
          style,
          inlineStyle,
          props = {
               id: undefined,
               optimum: undefined,
               high: undefined,
               low: undefined,
               label: undefined,
               selected: undefined,
               acceptCharSet: undefined,
               action: undefined,
               encType: undefined,
               noValidate: undefined,
               method: undefined,
               abbreviation: undefined,
               scope: undefined,
               size: undefined,
               spellCheck: undefined,
               value: undefined,
               src: undefined,
               srcLang: undefined,
               alt: undefined,
               colSpan: undefined,
               headers: undefined,
               rowSpan: undefined,
               placeholder: undefined,
               poster: undefined,
               type: undefined,
               name: undefined,
               rev: undefined,
               min: undefined,
               download: undefined,
               playsInline: undefined,
               max: undefined,
               decoding: undefined,
               autofocus: undefined,
               cols: undefined,
               dirname: undefined,
               dir: undefined,
               disabled: undefined,
               form: undefined,
               maxLength: undefined,
               minLength: undefined,
               readOnly: undefined,
               required: undefined,
               ping: undefined,
               rows: undefined,
               wrap: undefined,
               title: undefined,
               href: undefined,
               hrefLang: undefined,
               autoplay: undefined,
               controls: undefined,
               dateTime: undefined,
               data: undefined,
               target: undefined,
               span: undefined,
               loop: undefined,
               muted: undefined,
               preload: undefined,
               rel: undefined,
               list: undefined,
               isFor: undefined,
               open: undefined,
               cite: undefined,
               allow: undefined,
               allowFullScreen: undefined,
               allowPaymentRequest: undefined,
               loading: undefined,
               referrerPolicy: undefined,
               sandbox: undefined,
               srcdoc: undefined,
               crossOrigin: undefined,
               isMap: undefined,
               longDesc: undefined,
               sizes: undefined,
               srcSet: undefined,
               useMap: undefined,
               accept: undefined,
               kind: undefined,
               default: undefined,
               autoComplete: undefined,
               checked: undefined,
               formAction: undefined,
               formEncType: undefined,
               formMethod: undefined,
               height: undefined,
               width: undefined,
               formNoValidate: undefined,
               formTarget: undefined,
               pattern: undefined,
               step: undefined,
               multiple: undefined,
               shape: undefined,
               coords: undefined,
               start: undefined,
          },
          hooks = {
               onCreated: undefined,
               beforeDestroyed: undefined,
               onDestroyed: undefined,
               onUpdated: undefined,
          },
     }) {
          if (!tag) {
               throw "tag cannot be empty";
          }

          // CreateComponent specific props
          this.$$createcomponent = "create-component";
          this.key = "0";
          this.renderIf = renderIf;

          // HTML Attributes
          this.tag = tag;

          if (className) this.className = className;
          if (style) this.style = style;
          if (inlineStyle) this.inlineStyle = inlineStyle;

          initprops(this, props);

          // Children
          this.children = [];

          initclassname(this, style);

          initchildren(this, children);

          // Events
          if (events) {
               this.events = events;
          }

          // Component Lifecycle
          inithooks(this, hooks);

          this.keying();
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

          return render;
     }

     update(newComponent) {
          let didUpdate = false;

          const htmlElement = findElementByKey(this);

          if (!htmlElement) {
               console.log(this.key);
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

          // update events
          updateevents(newComponent, htmlElement);

          // update inline style
          const inlineStyleDidUpdate = updatestyle(
               htmlElement.style,
               this.inlineStyle,
               newComponent.inlineStyle
          );

          // update attributes
          const attributesDidUpdate = updateattributes(this, newComponent, htmlElement);

          const childrenDidChange = updatechildren(this, newComponent, htmlElement);

          didUpdate =
               inlineStyleDidUpdate || attributesDidUpdate || childrenDidChange ? true : false;

          // Execute update lifecycle method
          if (didUpdate) this.updated(this, newComponent);

          return didUpdate;
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
                    if (child.$$createcomponent) {
                         child.created();
                    }
               });
          }
     }

     stateUpdated() {
          if (this.onStateUpdated) this.onStateUpdated();
          if (this.children) {
               this.children.forEach((child) => {
                    if (child.$$createcomponent) {
                         child.stateUpdated();
                    }
               });
          }
     }

     // execute onDestroyed lifecycle method
     destroyed() {
          if (this.onDestroyed) this.onDestroyed();
     }

     // execute beforedestroyed lifecycle method
     onBeforeDestroyed() {
          if (this.beforeDestroyed) this.beforeDestroyed();
     }

     // add external style
     addExternalStyle() {
          applystylesheet(this);
     }
}

export default CreateComponent;
