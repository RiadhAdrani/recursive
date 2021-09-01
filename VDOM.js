import SetState from "./SetState.js";

class VDOM {
     constructor({ appFunction, root }) {
          this.app = () => {
               return appFunction();
          };
          this.oldRender = appFunction();
          this.root = root;
     }

     static setState = (value) => new SetState(value);

     render() {
          this.root.innerHTML = "";
          this.root.append(this.app().render());
          this.oldRender = this.app();
     }

     update() {
          this.oldRender.update(this.app());
          this.oldRender = this.app();
     }
}

export default VDOM;
