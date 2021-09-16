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
          const newRender = this.app();
          this.root.innerHTML = "";
          this.root.append(newRender.render());
          this.oldRender = newRender;
          this.oldRender.created();
     }

     update() {
          const startTime = new Date().getTime();
          const newRender = this.app();
          this.oldRender.update(newRender);
          this.oldRender = newRender;
          if (this.devMode) console.log(`UI updated in ${new Date().getTime() - startTime}ms`);
     }
}

export default VDOM;
