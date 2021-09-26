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

          if (style) {
               if (style.className) {
                    if (!this.className) {
                         this.className = style.className;
                    } else {
                         this.className = `${className} ${style.className}`;
                    }
               }
          }

          if (children) {
               // if children is child or string
               if (["number", "string", "boolean"].includes(typeof children) && !children.render) {
                    this.children = [`${children}`];
               } else if (children.render) {
                    this.children = [children];
               }
               // if children is array
               // merge consequetive strings and add other elements
               else {
                    for (let i = 0; i < children.length; i++) {
                         if (!children[i]) continue;
                         if (!["number", "string", "boolean"].includes(typeof children[i])) {
                              this.children.push(children[i]);
                         } else {
                              let textNode = children[i];
                              for (let j = i + 1; j < children.length; j++) {
                                   if (["number", "string", "boolean"].includes(typeof children)) {
                                        break;
                                   } else {
                                        textNode += children[j];
                                        i++;
                                   }
                              }
                              this.children.push(textNode);
                         }
                    }
               }
          } else this.children = "";

          this.keying();
     }

     render() {
          // console.log("rendering element: ", this.key);
          const render = document.createElement(this.tag);

          // add attributes
          if (this.placeholder) render.placeholder = this.placeholder;
          if (this.src) render.src = this.src;
          if (this.alt) render.alt = this.alt;
          if (this.type) render.type = this.type;
          if (this.name) render.name = this.name;
          if (this.key) render.key = this.key;
          if (this.max) render.max = this.max;
          if (this.min) render.min = this.min;
          if (this.id) render.id = this.id;
          if (this.autofocus) render.autofocus = this.autofocus;
          if (this.cols) render.cols = this.cols;
          if (this.dirname) render.dirname = this.dirname;
          if (this.disabled) render.disabled = this.disabled;
          if (this.form) render.form = this.form;
          if (this.maxLength) render.maxlength = this.maxLength;
          if (this.readOnly) render.readonly = this.readOnly;
          if (this.required) render.required = this.required;
          if (this.rows) render.rows = this.rows;
          if (this.wrap) render.wrap = this.wrap;
          if (this.onCreated) render.onCreated = this.onCreated;
          if (this.onDestroyed) render.onDestroyed = this.onDestroyed;
          if (this.onUpdated) render.onUpdated = this.onUpdated;

          // add classes
          if (this.className) render.className = this.className;

          // apply inline style
          if (this.inlineStyle) {
               this.applyStyle(this.inlineStyle, render.style);
          }

          // add events
          if (this.events) {
               // add event listeners

               render.events = {};

               if (this.events.onClick) {
                    render.events.onClick = this.events.onClick;
                    // render.removeEventListener("click", onclick);
                    render.addEventListener("click", (e) => {
                         render.events.onClick(e);
                    });
               }
               if (this.events.onChange) {
                    render.events.onChange = this.events.onChange;
                    // .removeEventListener("input", oninput);
                    render.addEventListener("input", (e) => {
                         render.events.onChange(e);
                    });
               }
               if (this.events.onChanged) {
                    render.events.onChanged = this.events.onChanged;
                    // render.removeEventListener("change", onchange);
                    render.addEventListener("change", (e) => {
                         render.events.onChanged(e);
                    });
               }

               if (this.events.onMouseDown) {
                    render.events.onMouseDown = this.events.onMouseDown;

                    render.addEventListener("mousedown", (e) => {
                         render.events.onMouseDown(e);
                    });
               }

               if (this.events.onMouseEnter) {
                    render.events.onMouseEnter = this.events.onMouseEnter;

                    render.addEventListener("mouseenter", (e) => {
                         render.events.onMouseEnter(e);
                    });
               }

               if (this.events.onMouseLeave) {
                    render.events.onMouseLeave = this.events.onMouseLeave;

                    render.addEventListener("mouseleave", (e) => {
                         render.events.onMouseLeave(e);
                    });
               }

               if (this.events.onMouseMove) {
                    render.events.onMouseMove = this.events.onMouseMove;

                    render.addEventListener("mousemove", (e) => {
                         render.events.onMouseMove(e);
                    });
               }

               if (this.events.onMouseMove) {
                    render.events.onMouseMove = this.events.onMouseMove;

                    render.addEventListener("mousemove", (e) => {
                         render.events.onMouseMove(e);
                    });
               }

               if (this.events.onMouseOver) {
                    render.events.onMouseOver = this.events.onMouseOver;

                    render.addEventListener("mouseover", (e) => {
                         render.events.onMouseOver(e);
                    });
               }

               if (this.events.onMouseOut) {
                    render.events.onMouseOut = this.events.onMouseOut;

                    render.addEventListener("mouseout", (e) => {
                         render.events.onMouseOut(e);
                    });
               }

               if (this.events.onMouseUp) {
                    render.events.onMouseUp = this.events.onMouseUp;

                    render.addEventListener("mouseup", (e) => {
                         render.events.onMouseUp(e);
                    });
               }
          }

          if (this.value) {
               render.value = this.value;
          }

          this.addExternalStyle();

          // console.log(render);

          this.onChildren({
               children: this.children,
               onPlainText: () => {
                    render.innerText = this.children;
               },
               onSingleChild: () => {
                    this.children.key = `${this.key}`;
                    // // console.log(this.children.key);
                    render.append(this.children.render());
               },
               onChildren: () => {
                    if (this.children.length > 100) {
                         console.warn(
                              `TOO MANY CHILDREN (${this.children.length}): improve performance by reducing the number of children using array.slice()`
                         );
                    }
                    this.children.forEach((child) => {
                         this.onChild({
                              child: child,
                              onPlainText: () => {
                                   render.innerHTML += child;
                              },
                              onSingleChild: () => {
                                   const childRender = child.render();
                                   render.append(childRender);
                              },
                         });
                    });
               },
          });

          // Execute beforeCreated Life Cycle method
          if (this.beforeCreated) {
               // this life cycle method is not very useful and may cause weird behaviour when trying to update the UI
               // this.beforeCreated();
          }

          // console.log(render.key);
          return render;
     }

     update(newElement) {
          let didUpdate = false;

          const old = this.findElementByKey();

          // // console.log(newElement.render().key);
          // console.log("old => ", old, this.key);

          if (!old) {
               return;
          }

          // check if the element to compare with is a string
          if (typeof newElement === "string") {
               old.replaceWith(newElement);
               // console.log("new component is string");
               return;
          }
          // check if the elements have the same tag
          if (this.tag !== newElement.tag) {
               // Execute Lifecycle Method
               this.onBeforeDestroyed();

               // console.log("new component has different tag: ", this.tag, newElement.tag);
               old.replaceWith(newElement.render());
               newElement.created();

               // Execute Lifecycle Method
               this.destroyed();
               return;
          }

          if (newElement.onCreated) {
               old.onCreated = newElement.onCreated;
          } else {
               old.onCreated = undefined;
          }

          if (this.diffStyle(old.style, this.inlineStyle, newElement.inlineStyle)) didUpdate = true;

          if (this.src !== newElement.src) {
               if (newElement.src) {
                    old.src = newElement.src;
               } else {
                    old.removeAttribute("src");
               }
               didUpdate = true;
          }

          if (this.value !== newElement.value) {
               if (newElement.value) {
                    old.value = newElement.value;
               } else {
                    old.removeAttribute("value");
               }
               didUpdate = true;
          }

          if (this.placeholder !== newElement.placeholder) {
               if (newElement.placeholder) {
                    old.placeholder = newElement.placeholder;
               } else {
                    old.removeAttribute("placeholder");
               }

               didUpdate = true;
          }

          if (this.alt !== newElement.alt) {
               if (newElement.alt) {
                    old.alt = newElement.alt;
               } else {
                    old.removeAttribute("alt");
               }

               didUpdate = true;
          }

          if (this.type !== newElement.type) {
               if (newElement.type) {
                    old.type = newElement.type;
               } else {
                    old.removeAttribute("type");
               }
               didUpdate = true;
          }

          if (this.name !== newElement.name) {
               if (newElement.name) {
                    old.name = newElement.name;
               } else {
                    old.removeAttribute("name");
               }
               didUpdate = true;
          }

          if (this.max !== newElement.max) {
               if (newElement.max) {
                    old.max = newElement.max;
               } else {
                    old.removeAttribute("max");
               }

               didUpdate = true;
          }

          if (this.min !== newElement.min) {
               if (newElement.min) {
                    old.min = newElement.min;
               } else {
                    old.removeAttribute("min");
               }

               didUpdate = true;
          }

          if (this.autofocus !== newElement.autofocus) {
               if (newElement.autofocus) {
                    old.autofocus = newElement.autofocus;
               } else {
                    old.removeAttribute("autofocus");
               }

               didUpdate = true;
          }

          if (this.cols !== newElement.cols) {
               if (newElement.cols) {
                    old.cols = newElement.cols;
               } else {
                    old.removeAttribute("cols");
               }

               didUpdate = true;
          }

          if (this.dirname !== newElement.dirname) {
               if (newElement.dirname) {
                    old.dirname = newElement.dirname;
               } else {
                    old.removeAttribute("dirname");
               }

               didUpdate = true;
          }

          if (this.disabled !== newElement.disabled) {
               if (newElement.disabled) {
                    old.disabled = newElement.disabled;
               } else {
                    old.removeAttribute("disabled");
               }

               didUpdate = true;
          }

          if (this.form !== newElement.form) {
               if (newElement.form) {
                    old.form = newElement.form;
               } else {
                    old.removeAttribute("form");
               }

               didUpdate = true;
          }

          if (this.maxLength !== newElement.maxLength) {
               if (newElement.maxLength) {
                    old.maxlength = newElement.maxLength;
               } else {
                    old.removeAttribute("maxlength");
               }

               didUpdate = true;
          }

          if (this.readOnly !== newElement.readOnly) {
               if (newElement.readOnly) {
                    old.readonly = newElement.readOnly;
               } else {
                    old.removeAttribute("readonly");
               }

               didUpdate = true;
          }

          if (this.required !== newElement.required) {
               if (newElement.required) {
                    old.required = newElement.required;
               } else {
                    old.removeAttribute("required");
               }

               didUpdate = true;
          }

          if (this.rows !== newElement.rows) {
               if (newElement.rows) {
                    old.rows = newElement.rows;
               } else {
                    old.removeAttribute("rows");
               }

               didUpdate = true;
          }

          if (this.wrap !== newElement.wrap) {
               if (newElement.wrap) {
                    old.wrap = newElement.wrap;
               } else {
                    old.removeAttribute("wrap");
               }

               didUpdate = true;
          }

          // check if the elements have the same id
          if (this.id !== newElement.id) {
               if (newElement.id) {
                    old.id = newElement.id;
               } else {
                    old.removeAttribute("id");
               }

               didUpdate = true;
          }
          // check if the elements have the same classes
          if (this.className !== newElement.className) {
               if (newElement.className) {
                    old.className = newElement.className;
               } else {
                    old.removeAttribute("class");
               }

               didUpdate = true;
          }

          // Execute Update lifecycle method
          if (didUpdate) {
               this.updated();
          }

          // replace with new element if the events exists
          if (newElement.events) {
               // replace with new onClick event
               if (newElement.events.onClick) {
                    old.events.onClick = newElement.events.onClick;
               } else {
                    old.events.onClick = () => {};
               }

               if (newElement.events.onChange) {
                    old.events.onChange = newElement.events.onChange;
               } else {
                    old.events.onChange = () => {};
               }

               if (newElement.events.onChanged) {
                    old.events.onChanged = newElement.events.onChanged;
               } else {
                    old.events.onChanged = () => {};
               }

               if (newElement.events.onMouseDown) {
                    old.events.onMouseDown = newElement.events.onMouseDown;
               } else {
                    old.events.onMouseDown = () => {};
               }

               if (newElement.events.onMouseEnter) {
                    old.events.onMouseEnter = newElement.events.onMouseEnter;
               } else {
                    old.events.onMouseEnter = () => {};
               }

               if (newElement.events.onMouseLeave) {
                    old.events.onMouseLeave = newElement.events.onMouseLeave;
               } else {
                    old.events.onMouseLeave = () => {};
               }

               if (newElement.events.onMouseMove) {
                    old.events.onMouseMove = newElement.events.onMouseMove;
               } else {
                    old.events.onMouseMove = () => {};
               }

               if (newElement.events.onMouseOver) {
                    old.events.onMouseOver = newElement.events.onMouseOver;
               } else {
                    old.events.onMouseOver = () => {};
               }

               if (newElement.events.onMouseOut) {
                    old.events.onMouseOut = newElement.events.onMouseOut;
               } else {
                    old.events.onMouseOut = () => {};
               }

               if (newElement.events.onMouseUp) {
                    old.events.onMouseUp = newElement.events.onMouseUp;
               } else {
                    old.events.onMouseUp = () => {};
               }
          }

          if (!this.children && !newElement.children) {
               return;
          }

          // if new children is empty, just remove inner html
          if (!newElement.children) {
               old.innerHTML = "";
               if (newElement.tag === "textarea") {
                    old.value = "";
               }
               return;
          }

          // if old children is empty, just add the children of the new element
          if (!this.children && newElement.children) {
               // console.log("old => ", this.children, "new => ", newElement.children);
               newElement.children.forEach((child) => {
                    old.append(child.render ? child.render() : child);
               });
               return;
          }

          // console.log(this.key, typeof this.children, typeof newElement.children);
          // case children is string, new is string and not equal
          else if (typeof this.children === "string" && typeof newElement.children === "string") {
               if (newElement.children.toString() !== this.children.toString()) {
                    old.replaceChildren(newElement.children);

                    return;
               }
          }
          // case children is string, new is child
          else if (typeof this.children === "string" && newElement.children.render) {
               // console.log("current is string new is child");
               old.replaceChildren(newElement.children.render());

               if (!didUpdate) {
                    this.updated();
               }
          }
          // case children is child, new is string
          else if (this.children.render && typeof newElement.children === "string") {
               this.children.onBeforeDestroyed();
               // console.log("current is child new is string");
               old.replaceChildren(newElement.children);

               this.children.destroyed();

               if (!didUpdate) {
                    this.updated();
               }
          }
          // case children is string, new is children
          else if (typeof this.children === "string" && Array.isArray(newElement.children)) {
               // .log("current is string new is children");
               old.replaceChildren(
                    newElement.children.map((child) => (child.render ? child.render() : child))
               );
               newElement.created();

               if (!didUpdate) {
                    this.updated();
               }
          }
          // case children is children, new is string
          else if (Array.isArray(this.children) && typeof newElement.children === "string") {
               // console.log("current is children new is string");
               old.replaceChildren(newElement.children);

               if (!didUpdate) {
                    this.updated();
               }
          }
          // case children is child, new is child
          else if (this.children.render && newElement.children.render) {
               // console.log("current is child new is child");
               // console.log(this.key, this.children);
               // console.log(newElement.key, newElement.children);
               this.children.update(newElement.children);

               if (!didUpdate) {
                    this.updated();
               }
          }
          // case children is child, new is children
          else if (this.children.render && Array.isArray(newElement.children)) {
               this.children.onBeforeDestroyed();

               // console.log("current is child new is children");
               old.replaceChildren(newElement.render().innerHTML);

               this.children.destroyed();

               if (!didUpdate) {
                    this.updated();
               }
          }
          // case children is children, new is child
          else if (Array.isArray(this.children) && newElement.children.render) {
               this.children.forEach((child) => {
                    if (child.onBeforeDestroyed) {
                         child.onBeforeDestroyed();
                    }
               });

               // console.log("current is children new is child");
               old.replaceChildren(newElement.children.render());

               this.children.forEach((child) => {
                    if (child.destroyed) {
                         child.destroyed();
                    }
               });

               newElement.chilren.created();

               if (!didUpdate) {
                    this.updated();
               }
          }
          // case children is children, new is children
          else if (Array.isArray(this.children) && Array.isArray(newElement.children)) {
               //// console.log("current is children new is child");
               // if children have the same length
               if (this.children.length === newElement.children.length) {
                    this.arrayDiff(old, newElement);
               }
               // if this.children are greater than newElement.children
               else if (this.children.length > newElement.children.length) {
                    // console.log("old children are more");
                    // console.log(newElement.children.length);
                    // console.log(old.childNodes.length);

                    let i = newElement.children.length;
                    while (old.childNodes.length > newElement.children.length) {
                         if (this.children[i].onBeforeDestroyed)
                              this.children[i].onBeforeDestroyed();

                         old.childNodes.item(i).remove();

                         if (this.children[i].destroyed) this.children[i].destroyed();
                    }

                    this.children = [...this.children.slice(0, newElement.children.length)];

                    this.arrayDiff(old, newElement);
               }
               // if this.children are less than newElement.children
               else {
                    // console.log("old children are less");
                    const x = this.children.length;
                    this.children = [
                         ...this.children,
                         ...newElement.children.slice(this.children.length),
                    ];

                    const n = newElement.children.slice(x, newElement.children.length);

                    n.forEach((child) => {
                         old.append(child.render ? child.render() : child);
                         if (child.created) child.created();
                    });

                    this.arrayDiff(old, newElement);
               }
          }
     }

     keying() {
          if (typeof this.children !== "string") {
               if (this.children.render) {
                    this.children.key = `${this.key}0`;
                    // console.log(children);
               } else {
                    this.children.forEach((child) => {
                         if (typeof child !== "string") {
                              child.key = `${this.key}${this.children.indexOf(child)}`;
                              child.keying();
                         }
                    });
               }
          }
     }

     updated() {
          if (this.onUpdated) {
               this.onUpdated();
          }
     }

     applyStyle(selector, style) {
          for (let prop in selector) {
               if (!["length", "size", "parentRule"].includes(prop)) {
                    if (style.hasOwnProperty(prop) && selector[`${prop}`] !== "") {
                         style[`${prop}`] = selector[`${prop}`];
                    }
               }
          }
     }

     diffStyle(ComponentStyle, _old, _new) {
          let didChange = false;

          if (!_old) {
               this.applyStyle(_new, ComponentStyle);
               didChange = true;
          } else {
               for (let prop in _new) {
                    if (!["length", "size", "parentRule"].includes(prop)) {
                         if (_old[`${prop}`] !== _new[`${prop}`]) {
                              // console.log(_old[`${prop}`], _new[`${prop}`]);
                              ComponentStyle[`${prop}`] = _new[`${prop}`];
                              didChange = true;
                         }
                    }
               }
          }

          return didChange;
     }

     created() {
          if (this.onCreated) {
               this.onCreated();
          }
          if (this.children) {
               this.children.forEach((child) => {
                    if (child.render) {
                         child.created();
                    }
               });
          }
     }

     refreshed() {
          if (this.onRefreshed) {
               this.onRefreshed();
          }
          if (this.children) {
               this.children.forEach((child) => {
                    if (child.render) {
                         child.refreshed();
                    }
               });
          }
     }

     destroyed() {
          if (this.onDestroyed) {
               return this.onDestroyed();
          }
          return false;
     }

     onBeforeDestroyed() {
          if (this.beforeDestroyed) {
               return this.beforeDestroyed();
          }
          return false;
     }

     onChildren({
          children,
          onPlainText = () => {},
          onSingleChild = () => {},
          onChildren = () => {},
     }) {
          if (typeof children === "string") onPlainText(children);
          else if (children.render) onSingleChild(children);
          else onChildren(children);
     }

     onChild({ child, onPlainText = () => {}, onSingleChild = () => {} }) {
          if (typeof child === "string") onPlainText(child);
          else if (child.render) onSingleChild(child);
     }

     findElementByKey(key) {
          var elems = document.querySelector("#app").getElementsByTagName("*");

          // // console.log(elems);
          for (let i = 0; i < elems.length; i++) {
               if (key) {
                    if (elems[i].key == key) {
                         // // console.log(elems[i].key);
                         return elems[i];
                    }
               } else {
                    if (elems[i].key == this.key) {
                         // // console.log(elems[i].key);
                         return elems[i];
                    }
               }
          }
          return undefined;
     }

     arrayDiff(old, newElement) {
          for (let i = 0; i < this.children.length; i++) {
               //// console.log(this.children[i], newElement.children[i]);
               // case children is string, new is string
               if (
                    typeof this.children[i] === "string" &&
                    typeof newElement.children[i] === "string"
               ) {
                    //// console.log(`children-${i} are strings`);
                    // case not equal strings
                    if (this.children[i].toString() !== newElement.children[i].toString()) {
                         //// console.log(`children-${i} are not the same strings`);

                         if (old.childNodes) {
                              old.childNodes[i].nodeValue = newElement.children[i];
                         }

                         // old.children[i].innerHTML = newElement.children[i];
                    }
               }
               // case children is string, new is child
               else if (typeof this.children[i] === "string" && newElement.children[i].render) {
                    // console.log(`children-${i} are string & child`);
                    old.childNodes.forEach((child, key) => {
                         if (key == i) {
                              child.replaceWith(newElement.children[i].render());
                              child.created();
                         }
                    });
               }
               // case children is child, new is string
               else if (this.children[i].render && typeof newElement.children[i] === "string") {
                    //// console.log(`children-${i} are child and string`);
                    //// console.log("child node to be replaced: ");

                    this.children[i].onBeforeDestroyed();

                    old.childNodes.forEach((child, key) => {
                         if (key == i) {
                              child.replaceWith(newElement.children[i]);
                         }
                    });

                    this.children[i].destroyed();
               }
               // case children is child, new is child
               else {
                    //// console.log(`children-${i} are child and child`);
                    this.children[i].update(newElement.children[i]);
               }
          }
     }

     addExternalStyle() {
          if (this.style) {
               if (this.style.className) {
                    const arrayOfStyles = [];

                    const styleObject = (selector, content) => {
                         return {
                              selector: `.${this.style.className.trim()}${selector.trim()}`,
                              content: content,
                         };
                    };

                    if (this.style.normal) {
                         arrayOfStyles.push(styleObject("", this.style.normal));
                    }
                    if (this.style.hover) {
                         arrayOfStyles.push(styleObject(":hover", this.style.hover));
                    }
                    if (this.style.focus) {
                         arrayOfStyles.push(styleObject(":focus", this.style.focus));
                    }
                    if (this.style.active) {
                         arrayOfStyles.push(styleObject(":active", this.style.active));
                    }

                    arrayOfStyles.forEach((style) => {
                         vDOM.style.push(style);
                    });
               } else {
                    console.warn(
                         "MISSING STYLE CLASS: cannot apply the style without the styleClass. Add styleClass into your component.style object"
                    );
               }
          }

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
