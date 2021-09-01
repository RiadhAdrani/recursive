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
     }) {
          if (!tag) {
               throw "tag cannot be empty";
          }

          this.tag = tag;
          this.className = className;
          this.src = src;
          this.id = id;
          this.inlineStyle = inlineStyle;
          this.style = style;
          this.events = events;
          this.key = key;
          this.value = value;
          this.children = [];
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
               if (typeof children === "string" || children.render) {
                    this.children = [children];
               } else if (children.render) {
                    this.children = [children];
               }
               // if children is array
               // merge consequetive strings and add other elements
               else {
                    for (let i = 0; i < children.length; i++) {
                         if (typeof children[i] !== "string") {
                              this.children.push(children[i]);
                         } else {
                              let textNode = children[i];
                              for (let j = i + 1; j < children.length; j++) {
                                   if (typeof children[j] !== "string") {
                                        break;
                                   } else {
                                        textNode += children[j];
                                        i++;
                                   }
                              }
                              // // console.log(textNode);
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

          // add classes
          if (this.className) render.className = this.className;

          // apply inline style
          if (this.inlineStyle) {
               this.applyStyle(this.inlineStyle, render.style);
          }

          // add events
          if (this.events) {
               // add event listeners

               if (this.events.onClick) {
                    render.removeEventListener("click", onclick);
                    render.addEventListener("click", (e) => {
                         this.events.onClick(e);
                    });
               }
               if (this.events.onChange) {
                    render.removeEventListener("input", oninput);
                    render.addEventListener("input", (e) => {
                         this.events.onChange(e);
                    });
               }
               if (this.events.onChanged) {
                    render.removeEventListener("change", onchange);
                    render.addEventListener("change", (e) => {
                         this.events.onChanged(e);
                    });
               }
               if (this.events.onDoubleClick) {
                    render.removeEventListener("dbclick", ondblclick);
                    render.addEventListener("dbclick", (e) => {
                         this.events.onDoubleClick(e);
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

          // console.log(render.key);
          return render;
     }

     update(newElement) {
          const old = this.findElementByKey();

          // // console.log(newElement.render().key);
          // console.log("old => ", old, this.key);

          if (!old) {
               console.log("old =>", old, this.key);
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
               // console.log("new component has different tag: ", this.tag, newElement.tag);
               old.replaceWith(newElement.render());
          }

          this.diffStyle(old.style, this.inlineStyle, newElement.inlineStyle);

          if (this.src !== newElement.src) {
               old.src = newElement.src;
          }

          if (this.placeholder !== newElement.placeholder) {
               old.placeholder = newElement.placeholder;
          }

          if (this.alt !== newElement.alt) {
               old.alt = newElement.alt;
          }

          if (this.type !== newElement.type) {
               old.type = newElement.type;
          }

          if (this.name !== newElement.name) {
               old.name = newElement.name;
          }

          if (this.max !== newElement.max) {
               old.max = newElement.max;
          }

          if (this.min !== newElement.min) {
               old.min = newElement.min;
          }

          if (this.autofocus !== newElement.autofocus) {
               old.autofocus = newElement.autofocus;
          }

          if (this.cols !== newElement.cols) old.cols = newElement.cols;

          if (this.dirname !== newElement.dirname) old.dirname = newElement.dirname;

          if (this.disabled !== newElement.disabled) old.disabled = newElement.disabled;

          if (this.form !== newElement.form) old.form = newElement.form;

          if (this.maxLength !== newElement.maxLength) old.maxlength = newElement.maxLength;

          if (this.readOnly !== newElement.readOnly) old.readonly = newElement.readOnly;

          if (this.required !== newElement.required) old.required = newElement.required;

          if (this.rows !== newElement.rows) old.rows = newElement.rows;

          if (this.wrap !== newElement.wrap) old.wrap = newElement.wrap;

          // check if the elements have the same id
          if (this.id !== newElement.id) {
               // console.log("new component has another id");
               old.id = newElement.id;
               // old.replaceWith(newElement.render());
          }
          // check if the elements have the same classes
          if (this.className !== newElement.className) {
               // console.log("new component has another class name");
               old.className = newElement.className;
               // old.replaceWith(newElement.render());
          }

          // replace with new element if the events exists
          if (newElement.events) {
               // replace with new onClick event
               if (newElement.events.onClick) {
                    // console.log(newElement.events);
                    if (this.events) {
                         if (this.events.onClick !== newElement.events.onClick) {
                              old.replaceWith(newElement.render());
                         }
                    }
               }
          }

          // console.log(this.key, typeof this.children, typeof newElement.children);
          // case children is string, new is string and not equal
          if (typeof this.children === "string" && typeof newElement.children === "string") {
               if (newElement.children.toString() !== this.children.toString()) {
                    console.log("text diff");
                    old.replaceChildren(newElement.children);
                    return;
               }
          }
          // case children is string, new is child
          else if (typeof this.children === "string" && newElement.children.render) {
               // console.log("current is string new is child");
               old.replaceChildren(newElement.children.render());
               return;
          }
          // case children is child, new is string
          else if (this.children.render && typeof newElement.children === "string") {
               // console.log("current is child new is string");
               old.replaceChildren(newElement.children);
          }
          // case children is string, new is children
          else if (typeof this.children === "string" && Array.isArray(newElement.children)) {
               // console.log("current is string new is children");
               old.replaceChildren(newElement.render());
          }
          // case children is children, new is string
          else if (Array.isArray(this.children) && typeof newElement.children === "string") {
               // console.log("current is children new is string");
               old.replaceChildren(newElement.children);
          }
          // case children is child, new is child
          else if (this.children.render && newElement.children.render) {
               // console.log("current is child new is child");
               // console.log(this.key, this.children);
               // console.log(newElement.key, newElement.children);
               this.children.update(newElement.children);
          }
          // case children is child, new is children
          else if (this.children.render && Array.isArray(newElement.children)) {
               // console.log("current is child new is children");
               old.replaceChildren(newElement.render().innerHTML);
          }
          // case children is children, new is child
          else if (Array.isArray(this.children) && newElement.children.render) {
               // console.log("current is children new is child");
               old.replaceChildren(newElement.children.render());
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
                         old.childNodes.item(i).remove();
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

                    n.forEach((child) => old.append(child.render ? child.render() : child));

                    this.arrayDiff(old, newElement);
               }
          }
     }

     keying() {
          if (typeof this.children !== "string") {
               if (this.children.render) {
                    this.children.key = `${this.key}0`;
                    // // console.log(children);
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
          if (!_old) {
               this.applyStyle(_new, ComponentStyle);
          } else {
               for (let prop in _new) {
                    if (!["length", "size", "parentRule"].includes(prop)) {
                         if (_old[`${prop}`] !== _new[`${prop}`]) {
                              // console.log(_old[`${prop}`], _new[`${prop}`]);
                              ComponentStyle[`${prop}`] = _new[`${prop}`];
                         }
                    }
               }
          }
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

                         // old.children[i].innerHTML = newElement.children[i];
                         old.childNodes[i].nodeValue = newElement.children[i];
                    }
               }
               // case children is string, new is child
               else if (typeof this.children[i] === "string" && newElement.children[i].render) {
                    // console.log(`children-${i} are string & child`);
                    old.childNodes.forEach((child, key) => {
                         if (key == i) {
                              child.replaceWith(newElement.children[i].render());
                         }
                    });
               }
               // case children is child, new is string
               else if (this.children[i].render && typeof newElement.children[i] === "string") {
                    //// console.log(`children-${i} are child and string`);
                    //// console.log("child node to be replaced: ");
                    old.childNodes.forEach((child, key) => {
                         if (key == i) {
                              child.replaceWith(newElement.children[i]);
                         }
                    });
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
                    const sheet = document.styleSheets[0];

                    const styleObject = (selector, content) => {
                         return {
                              selector: `.${this.style.className}${selector}`,
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

                    arrayOfStyles.forEach((item) => {
                         for (let i = 0; i < sheet.cssRules.length; i++) {
                              if (sheet.cssRules.item(i).selectorText == item.selector) {
                                   sheet.deleteRule(i);
                                   break;
                              }
                         }
                         sheet.insertRule(`${item.selector}{${item.content}}`);
                    });
               } else {
                    console.warn(
                         "MISSING STYLE CLASS: cannot apply the style without the styleClass. Add styleClass into your component.style object"
                    );
               }
          }
     }
}

export default CreateComponent;
