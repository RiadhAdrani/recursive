import SetState from "./vdom/SetState.js";
import handlecss from "./vdom/tools/handlecss.js";
import CreateComponent from "./createcomponent/CreateComponent.js";
import staticcsshandler from "./vdom/tools/staticcsstotext.js";
import handleevents from "./vdom/tools/handleevents.js";

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

          this.devMode = devMode;
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
      */
     static init(root, styleRoot, staticStyleRoot) {
          window.vDOM = new RecursiveDOM({
               root,
               styleRoot,
               staticStyleRoot: staticStyleRoot,
               app: () => {},
          });
          window.setState = this.setState;
          window.updateAfter = SetState.updateAfter;
     }

     /**
      * Render the app for the first time.
      */
     render() {
          const startTime = new Date().getTime();

          try {
               const newRender = this.app();
               this.root.innerHTML = "";
               handleevents(this.events);
               this.root.append(newRender.render());
               this.oldRender = newRender;
               this.oldRender.addExternalStyle();
               this.sst = handlecss(
                    this.style,
                    this.animations,
                    this.mediaQueries,
                    this.styleRoot,
                    this.sst
               );
               this.staticStyleRoot.innerHTML = staticcsshandler(this.staticStyle);
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
               this.renderState = true;
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
               this.renderState = false;
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
