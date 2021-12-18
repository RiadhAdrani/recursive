import SetState from "./vdom/SetState.js";
import CreateComponent from "./createcomponent/CreateComponent.js";
import HandleStyle from "./vdom/HandleStyle.js";
import HandleWindow from "./vdom/HandleWindow.js";

/**
 * ## RecursiveDOM
 * The Engine of the Recursive library that play the role of the VDOM
 * (Virtual Document Object Model)
 * and the CSSOM (Cascading Style Sheet Object Model).
 * @global The VDOM will be injected automatically in the `window` object.
 * @see{@link CreateComponent}
 */
class RecursiveDOM {
     /**
      * @constructor
      * @param {Object} params deconstructed paramaters
      * @param {Function} params.appFunction application UI tree
      * @param {HTMLElement} params.root html element that will host the app
      * @param {HTMLElement} params.styleRoot style tag that will host the app style.
      * @param {boolean} params.devMode allow infos about the state of tbe app to be logged into the console.
      */
     constructor({ app, root, styleRoot, staticStyle, staticStyleRoot, events, devMode = false }) {
          this.app = () => {
               return app();
          };
          this.oldRender = app();

          this.style = [];
          this.animations = [];
          this.mediaQueries = [];
          this.sst = "";
          this.staticStyle = staticStyle;
          this.events = events;

          this.root = root;
          this.staticStyleRoot = staticStyleRoot;
          this.styleRoot = styleRoot;
          this.renderingIteration = 0;

          this.devMode = devMode;
          this.multiThreading = true;
     }

     /**
      * Initialize a stateful object
      * @param {any} value initial value
      * @returns stateful object
      * @function
      * @see {@link SetState}
      */
     static setState = (value) => new SetState(value);

     /**
      * init the Recursive DOM
      * @param {Object} params deconstructed paramaters
      * @param {HTMLElement} params.root html element that will host the app
      * @param {HTMLElement} params.styleRoot style tag that will host the app style.
      * @param {HTMLElement} params.staticStyleRoot style tag that will host the static app style.
      * @param {JSON} params.options initialize RecursiveDOM dev parameters
      */
     static init(
          root,
          styleRoot,
          staticStyleRoot,
          options = { devMode: true, multiThreading: true }
     ) {
          window.vDOM = new RecursiveDOM({
               root,
               styleRoot,
               staticStyleRoot: staticStyleRoot,
               app: () => {},
          });

          window.vDOM.devMode = options.devMode;
          window.vDOM.multiThreading = options.multiThreading;

          window.setState = this.setState;
          window.updateAfter = SetState.updateAfter;
     }

     styleThread() {
          this.style = [];
          this.animations = [];
          this.mediaQueries = [];

          this.renderingIteration++;
          this.app().addExternalStyle();

          if (this.multiThreading && window.Worker) {
               let worker = new Worker("../recursivejs/vdom/StyleThread.js", { type: "module" });

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
               });
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
          const startTime = new Date().getTime();

          try {
               this.styleThread();

               this.oldRender = this.app();
               this.root.innerHTML = "";
               HandleWindow.events(this.events);
               this.root.append(this.oldRender.render());

               this.staticStyleRoot.innerHTML = HandleStyle.exportStatic(this.staticStyle);
               this.oldRender.$onCreated();
          } catch (e) {
               if (e.name === "RangeError") {
                    throw `VDOM : infinite Rerendering : Make sure to update state only when needed.`;
               } else {
                    console.error(e);
               }
          }

          if (this.devMode)
               console.log(`First render done in ${new Date().getTime() - startTime}ms`);
     }

     /**
      * Update the UI whenever a stateful object has been modified using the `setValue` method.
      * @see {@link SetState.setValue}
      * @function
      */
     update() {
          const startTime = new Date().getTime();

          try {
               this.styleThread();

               const newRender = this.app();
               this.oldRender.update(newRender);
               this.oldRender = newRender;
          } catch (e) {
               if (e.name === "RangeError") {
                    throw `VDOM : infinite Rerendering : Make sure to update state only when needed.`;
               } else {
                    throw e;
               }
          }

          if (this.devMode) console.log(`UI updated in ${new Date().getTime() - startTime}ms`);
     }
}

export default RecursiveDOM;
