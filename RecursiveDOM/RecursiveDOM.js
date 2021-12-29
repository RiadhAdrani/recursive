import CreateComponent from "../CreateComponent/CreateComponent.js";
import CustomComponents from "../CreateComponent/CustomComponents.js";

import HandleStyle from "./HandleStyle.js";
import HandleWindow from "./HandleWindow.js";
import SetState from "./SetState.js";

/**
 * ## RecursiveDOM
 * The Engine of the Recursive library that play the role of the VDOM
 * (Virtual Document Object Model)
 * and the CSSOM (Cascading Style Sheet Object Model).
 * @global The VDOM will be injected automatically in the `window` object.
 * @see{@link CreateComponent}
 */
class RecursiveDOM {
     // private fields
     #oldRender;

     /**
      * @constructor
      * @param {Object} params deconstructed paramaters
      * @param {Function} params.appFunction application UI tree
      * @param {HTMLElement} params.root html element that will host the app
      * @param {HTMLElement} params.styleRoot style tag that will host the app style.
      * @param {boolean} params.devMode allow infos about the state of tbe app to be logged into the console.
      */
     constructor({ staticStyle, app, events, devMode = false }) {
          this.app = () => {
               return app();
          };
          this.#oldRender = app();

          CustomComponents();

          const appRoot = document.createElement("div");
          appRoot.id = "app-root";
          const appStyle = document.createElement("style");
          const appStaticStyle = document.createElement("style");

          document.querySelector("body").append(appRoot);
          document.querySelector("head").append(appStaticStyle);
          document.querySelector("head").append(appStyle);

          this.style = [];
          this.animations = [];
          this.mediaQueries = [];
          this.sst = "";
          this.staticStyle = staticStyle;
          this.events = events;

          this.root = appRoot;
          this.staticStyleRoot = appStaticStyle;
          this.styleRoot = appStyle;
          this.renderingIteration = 0;

          this.devMode = devMode;
          this.multiThreading = false;
     }

     /**
      * init the Recursive DOM
      * @param {Object} params deconstructed paramaters
      * @param {HTMLElement} params.root html element that will host the app
      * @param {HTMLElement} params.styleRoot style tag that will host the app style.
      * @param {HTMLElement} params.staticStyleRoot style tag that will host the static app style.
      * @param {JSON} params.options initialize RecursiveDOM dev parameters
      */
     static Init({ options = { devMode: true, multiThreading: true } }) {
          window.RecursiveDOM = new RecursiveDOM({
               app: () => {},
          });

          if (options) {
               window.RecursiveDOM.devMode = options.devMode;
               window.RecursiveDOM.multiThreading = options.multiThreading;
          }

          window.setState = (value) => new SetState(value);
          window.updateAfter = SetState.updateAfter;
     }

     #handleError(execute) {
          try {
               execute();
          } catch (e) {
               this.app = () => {
                    return new CreateComponent({
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
                                   children: `Stack: ${e.stack}`,
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
               };
               this.render();
               console.error(e);
          }
     }

     #styleThread() {
          this.style = [];
          this.animations = [];
          this.mediaQueries = [];

          this.renderingIteration++;
          this.app().addExternalStyle();

          if (false) {
               const worker = new Worker("./StyleThread.js", { type: "module" });

               worker.postMessage({
                    selectors: this.style,
                    animations: this.animations,
                    media: this.mediaQueries,
                    old: this.sst,
                    devMode: this.devMode,
                    iteration: this.renderingIteration,
               });

               worker.addEventListener("message", (e) => {
                    if (e.data.didchange && e.data.iteration === this.renderingIteration) {
                         this.styleRoot.innerHTML = e.data.text;
                    }
                    worker.terminate();
               });

               console.log(worker);
          } else {
               this.styleRoot.innerHTML = HandleStyle.export(
                    this.style,
                    this.animations,
                    this.mediaQueries,
                    this.sst,
                    this.devMode
               );
          }
     }

     /**
      * Render the app for the first time.
      */
     render() {
          this.#handleError(() => {
               const startTime = new Date().getTime();

               this.#oldRender = this.app();
               this.#styleThread();
               this.root.innerHTML = "";
               HandleWindow.events(this.events);
               this.root.append(this.#oldRender.render());

               this.staticStyleRoot.innerHTML = HandleStyle.exportStatic(this.staticStyle);
               this.#oldRender.$onCreated();

               if (this.devMode)
                    console.log(`First paint done in ${new Date().getTime() - startTime}ms`);
          });
     }

     /**
      * Update the UI whenever a stateful object has been modified using the `setValue` method.
      * @see {@link SetState.setValue}
      * @function
      */
     update() {
          this.#handleError(() => {
               const startTime = new Date().getTime();

               const newRender = this.app();
               this.#oldRender.update(newRender);
               this.#styleThread();
               this.#oldRender = newRender;

               if (this.devMode) console.log(`UI updated in ${new Date().getTime() - startTime}ms`);
          });
     }
}

export default RecursiveDOM;
