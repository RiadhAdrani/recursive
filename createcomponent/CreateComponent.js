import applystylesheet from "./tools/applystylesheet.js";
import findElementByKey from "./tools/findElementByKey.js";
import initchildren from "./tools/initchildren.js";
import keying from "./tools/keying.js";
import updateattributes from "./tools/updateattributes.js";
import updatechildren from "./tools/updatechildren.js";
import updateevents from "./tools/updateevents.js";
import updatestyle from "./tools/updatestyle.js";
import renderattributes from "./tools/renderattributes.js";
import renderevents from "./tools/renderevents.js";
import renderchildren from "./tools/renderchildren.js";
import initclassname from "./tools/initclassname.js";

class CreateComponent {
     constructor({
          tag,
          renderIf = true,
          children,
          className,
          id,
          inlineStyle,
          events,
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
          start,
          onCreated,
          beforeDestroyed,
          onDestroyed,
          onUpdated,
          onStateUpdated,
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
          this.className = className;
          this.src = src;
          this.id = id;
          this.inlineStyle = inlineStyle;
          this.style = style;
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
          this.start = start;
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

          initclassname(this, style);

          initchildren(this, children);

          // Events
          this.events = events;

          // Component Lifecycle
          this.onCreated = onCreated;
          this.onDestroyed = onDestroyed;
          this.onUpdated = onUpdated;
          this.beforeDestroyed = beforeDestroyed;
          this.onStateUpdated = onStateUpdated;

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
