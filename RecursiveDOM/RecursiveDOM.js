import { throwError } from "./RecursiveError";
import CreateComponent from "../CreateComponent/CreateComponent.js";
import HandleWindow from "./HandleWindow.js";
import RecursiveEvents from "./RecursiveEvents.js";

/**
 * ## RecursiveDOM
 * The Engine of the Recursive library that play the role of the VDOM
 * (Virtual Document Object Model)
 * and the CSSOM (Cascading Style Sheet Object Model).
 * @global The VDOM will be injected automatically in the `window` object.
 * @see{@link CreateComponent}
 */
class RecursiveDOM {
     static devMode = false;

     /**
      * @constructor
      * @param {Object} params deconstructed paramaters
      * @param {Function} params.appFunction application UI tree
      */
     constructor() {
          this.root = document.createElement("app-view");

          document.querySelector("body").append(this.root);

          addEventListener(RecursiveEvents.EVENTS._UPDATE_START, () => {
               this.update();
               RecursiveEvents.didUpdate();
          });
     }

     /**
      * Render the app for the first time.
      */
     render() {
          const startTime = new Date().getTime();

          this.oldRender = this.app();

          if (this.oldRender.$$createcomponent !== "create-component") {
               throwError('Root component is not of type "CreateComponent"', [
                    "Render only accepts a function call.",
                    "You should return CreateComponent from your app function.",
               ]);
          }

          this.oldRender.addExternalStyle();

          RecursiveEvents.computeStyle();

          this.root.innerHTML = "";

          HandleWindow.events(this.events);

          RecursiveEvents.willRender();

          this.root.append(this.oldRender.render());

          if (RecursiveDOM.devMode)
               console.log(`First paint done in ${new Date().getTime() - startTime}ms`);

          this.oldRender.$onCreated();

          RecursiveEvents.didRender();
     }

     /**
      * Update the UI whenever a stateful object has been modified using the `setValue` or `updateAfter` method.
      * @see {@link SetState.setValue}
      * @function
      */
     update() {
          const startTime = new Date().getTime();

          const newRender = this.app();

          newRender.addExternalStyle();

          RecursiveEvents.willUpdate();

          this.oldRender.update(newRender);

          this.oldRender = newRender;

          RecursiveEvents.computeStyle();

          if (RecursiveDOM.devMode)
               console.log(`UI updated in ${new Date().getTime() - startTime}ms`);
     }

     destroy() {
          this.roots.app.remove();
     }
}

export default RecursiveDOM;
