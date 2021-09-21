import SetState from "./SetState.js";

function initStyle() {
     const appStyle = document.createElement("div");
     appStyle.id = "app-style";
     document.getElementsByTagName("html").namedItem().appendChild(appStyle);
}

class VDOM {
     constructor({ appFunction, root, devMode = false }) {
          this.app = () => {
               return appFunction();
          };
          this.oldRender = appFunction();

          this.style = [];
          this.oldStyle = [];

          this.root = root;

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

          this.style = [];
          this.oldRender.addExternalStyle();
          this.oldStyle = this.style;
     }

     update() {
          const startTime = new Date().getTime();
          const newRender = this.app();
          this.oldRender.update(newRender);
          this.oldRender = newRender;

          this.style = [];
          this.oldRender.addExternalStyle();
          console.log(this.style);
          this.oldStyle = this.style;
          this.style = [];

          if (this.devMode) console.log(`UI updated in ${new Date().getTime() - startTime}ms`);
     }
}

export default VDOM;
