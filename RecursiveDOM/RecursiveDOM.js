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

          addEventListener("recursive-update", () => {
               this.update();
          });
     }

     handleError(execute) {
          try {
               execute();
          } catch (e) {
               const error = new CreateComponent({
                    tag: "div",
                    inlineStyle: {
                         padding: "20px 20px 40px 20px",
                         background: "#992222",
                         color: "white",
                         position: "absolute",
                         fontSize: "20px",
                         width: "-webkit-fill-available",
                    },
                    children: [
                         new CreateComponent({
                              tag: "p",
                              children: `${e}`,
                              inlineStyle: {
                                   fontSize: "20px",
                                   fontWeight: "Trebuchet MS",
                                   padding: "10px",
                              },
                         }),
                         new CreateComponent({
                              tag: "p",
                              children: `${e.stack}`,
                              inlineStyle: {
                                   padding: "20px",
                                   fontSize: "16px",
                                   lineHeight: "1.5em",
                                   whiteSpace: "break-spaces",
                                   fontFamily: "monospace",
                                   background: "#551111",
                              },
                         }),
                    ],
               });

               this.root.innerHTML = "";
               this.root.append(error.render());
               console.error(e);
          }
     }

     /**
      * Render the app for the first time.
      */
     render() {
          this.handleError(() => {
               const startTime = new Date().getTime();

               this.oldRender = this.app();

               this.app().addExternalStyle();

               RecursiveEvents.computeStyle();

               this.root.innerHTML = "";

               HandleWindow.events(this.events);

               RecursiveEvents.willRender();

               this.root.append(this.oldRender.render());

               if (RecursiveDOM.devMode)
                    console.log(`First paint done in ${new Date().getTime() - startTime}ms`);

               this.oldRender.$onCreated();

               RecursiveEvents.didRender();
          });
     }

     /**
      * Update the UI whenever a stateful object has been modified using the `setValue` or `updateAfter` method.
      * @see {@link SetState.setValue}
      * @function
      */
     update() {
          this.handleError(() => {
               const startTime = new Date().getTime();

               const newRender = this.app();

               newRender.addExternalStyle();

               RecursiveEvents.willUpdate();

               this.oldRender.update(newRender);

               this.oldRender = newRender;

               RecursiveEvents.computeStyle();

               RecursiveEvents.didUpdate();

               if (RecursiveDOM.devMode)
                    console.log(`UI updated in ${new Date().getTime() - startTime}ms`);
          });
     }

     destroy() {
          this.roots.app.remove();
     }
}

export default RecursiveDOM;
