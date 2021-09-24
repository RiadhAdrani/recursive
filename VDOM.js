import ConvertCssToText from "./ConvertCssToText.js";
import SetState from "./SetState.js";

function handleSameSelector(newS, oldS) {
     for (var attr of Object.keys(oldS)) {
          if (!newS[attr]) {
               newS[attr] = oldS[attr];
          }
     }
     return newS;
}

function toText(css) {
     let output = "\n";
     css.forEach((s) => {
          output += `\n${s.selector}{\n${ConvertCssToText(s.content)}}`;
     });
     return output;
}

function handleCSS(css, root) {
     let output = [];

     for (let i in css) {
          let found = false;

          for (let j in output) {
               if (output[j].selector === css[i].selector) {
                    found = true;
                    handleSameSelector(output[j].content, css[i].content);
                    break;
               }
          }

          if (!found) {
               output.push(css[i]);
          }
     }

     root.innerHTML = toText(output);
}

class VDOM {
     constructor({ appFunction, root, styleRoot, devMode = false }) {
          this.app = () => {
               return appFunction();
          };
          this.oldRender = appFunction();

          this.style = [];

          this.root = root;

          this.styleRoot = styleRoot;

          this.devMode = devMode;

          window.vDOM = this;
     }

     static setState = (value) => new SetState(value);

     render() {
          const newRender = this.app();
          this.root.innerHTML = "";
          this.root.append(newRender.render());
          this.oldRender = newRender;
          this.oldRender.created();

          this.oldRender.addExternalStyle();
          handleCSS(this.style, this.styleRoot);
     }

     update() {
          const startTime = new Date().getTime();
          const newRender = this.app();
          this.oldRender.update(newRender);
          this.oldRender = newRender;

          this.style = [];
          this.oldRender.addExternalStyle();
          handleCSS(this.style, this.styleRoot);

          if (this.devMode) console.log(`UI updated in ${new Date().getTime() - startTime}ms`);
     }
}

export default VDOM;
