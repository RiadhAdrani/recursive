import SetState from "./SetState.js";
import handlecss from "./vdom/handlecss.js";

class VDOM {
     constructor({ appFunction, root, styleRoot, devMode = false }) {
          this.app = () => {
               return appFunction();
          };
          this.oldRender = appFunction();

          this.style = [];
          this.animations = [];
          this.mediaQueries = [];
          this.sst = "";

          this.root = root;

          this.styleRoot = styleRoot;

          this.devMode = devMode;

          window.vDOM = this;
     }

     static setState = (value) => new SetState(value);

     render() {
          const startTime = new Date().getTime();
          const newRender = this.app();
          this.root.innerHTML = "";
          this.root.append(newRender.render());
          this.oldRender = newRender;
          this.oldRender.created();
          this.oldRender.addExternalStyle();
          this.sst = handlecss(
               this.style,
               this.animations,
               this.mediaQueries,
               this.styleRoot,
               this.sst
          );

          if (this.devMode)
               console.log(`First render done in ${new Date().getTime() - startTime}ms`);
     }

     update() {
          const startTime = new Date().getTime();
          const newRender = this.app();
          this.oldRender.update(newRender);

          this.oldRender = newRender;

          this.style = [];
          this.animations = [];
          this.mediaQueries = [];
          this.oldRender.addExternalStyle();
          this.sst = handlecss(
               this.style,
               this.animations,
               this.mediaQueries,
               this.styleRoot,
               this.sst
          );
          if (this.devMode) console.log(`UI updated in ${new Date().getTime() - startTime}ms`);
     }
}

export default VDOM;
