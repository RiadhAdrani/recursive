import applystylesheet from "./createcomponent/applystylesheet.js";
import InlineSelector from "./InlineSelector.js";
import findElementByKey from "./createcomponent/findElementByKey.js";
import initchildren from "./createcomponent/initchildren.js";
import initstyle from "./createcomponent/initstyle.js";
import keying from "./createcomponent/keying.js";
import updateattributes from "./createcomponent/updateattributes.js";
import updatechildren from "./createcomponent/updatechildren.js";
import updateevents from "./createcomponent/updateevents.js";
import updatestyle from "./createcomponent/updatestyle.js";
import renderattributes from "./createcomponent/renderattributes.js";
import renderevents from "./createcomponent/renderevents.js";
import renderchildren from "./createcomponent/renderchildren.js";

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
          minLength,
          readOnly,
          required,
          rows,
          wrap,
          title,
          href,
          autoplay,
          controls,
          dateTime,
          target,
          span,
          loop,
          muted,
          preload,
          list,
          isFor,
          open,
          beforeCreated,
          onCreated,
          beforeDestroyed,
          onDestroyed,
          onUpdated,
          cite,
          allow,
          allowFullScreen,
          allowPaymentRequest,
          loading,
          referrerPolicy,
          sandbox,
          srcdoc,
          crossOrigin,
          isMap,
          longDesc,
          sizes,
          srcSet,
          useMap,
          accept,
          autoComplete,
          checked,
          formAction,
          formEncType,
          formMethod,
          formNoValidate,
          formTarget,
          pattern,
          step,
          multiple,
          shape,
          coords,
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
          this.title = title;
          this.autofocus = autofocus;
          this.cols = cols;
          this.dirname = dirname;
          this.disabled = disabled;
          this.form = form;
          this.maxlength = maxLength;
          this.readonly = readOnly;
          this.required = required;
          this.rows = rows;
          this.wrap = wrap;
          this.href = href;
          this.autoplay = autoplay;
          this.controls = controls;
          this.loop = loop;
          this.muted = muted;
          this.preload = preload;
          this.target = target;
          this.cite = cite;
          this.span = span;
          this.list = list;
          this.datetime = dateTime;
          this.open = open;
          this.for = isFor;
          this.allow = allow;
          this.allowfullscreen = allowFullScreen;
          this.allowpaymentrequest = allowPaymentRequest;
          this.loading = loading;
          this.referrerpolicy = referrerPolicy;
          this.sandbox = sandbox;
          this.srcdoc = srcdoc;
          this.crossorigin = crossOrigin;
          this.ismap = isMap;
          this.longdesc = longDesc;
          this.sizes = sizes;
          this.usemap = useMap;
          this.srcset = srcSet;
          this.accept = accept;
          this.autocomplete = autoComplete;
          this.checked = checked;
          this.formaction = formAction;
          this.formenctype = formEncType;
          this.formmethod = formMethod;
          this.formnovalidate = formNoValidate;
          this.formtarget = formTarget;
          this.multiple = multiple;
          this.step = step;
          this.pattern = pattern;
          this.shape = shape;
          this.coords = coords;
          this.minlength = minLength;

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
          renderattributes(this, render);

          // add events
          renderevents(this, render);

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
