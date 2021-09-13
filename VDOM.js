import SetState from "./SetState.js";

class VDOM {
     constructor({ appFunction, root, devMode = false }) {
          this.app = () => {
               return appFunction();
          };
          this.oldRender = appFunction();
          this.root = root;
          this.devMode = devMode;
          window.vDOM = this;
     }

     static setState = (value) => new SetState(value);

     render() {
          this.root.innerHTML = "";
          this.root.append(this.app().render());
          this.oldRender = this.app();
          this.oldRender.created();
     }

     update() {
          const startTime = new Date().getTime();
          this.oldRender.update(this.app());
          this.oldRender = this.app();
          if (this.devMode) console.log(`UI updated in ${new Date().getTime() - startTime}ms`);
     }
}

export default VDOM;
