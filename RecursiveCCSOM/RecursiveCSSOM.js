import HandleStyleObject from "./HandleStyleObject.js";
import Handler from "./HandleStyle.js";
import RecursiveEvents from "../RecursiveDOM/RecursiveEvents.js";
import RecursiveDOM from "../RecursiveDOM/RecursiveDOM.js";

class RecursiveCSSOM {
     constructor() {
          this.appStyle = document.createElement("style");
          this.appStaticStyle = document.createElement("style");

          document.querySelector("head").append(this.appStaticStyle);
          document.querySelector("head").append(this.appStyle);

          this.sheet = "";
          this.staticSheet = "";

          this.stack = [];
          this.current = {
               selectors: [],
               animations: [],
               mediaQueries: [],
          };

          addEventListener(RecursiveEvents.EVENTS._STYLE_COMPONENT, (e) => {
               this.stack.push(e.detail);
          });

          addEventListener(RecursiveEvents.EVENTS._STYLE_COMPUTE, () => {
               this.current = {
                    selectors: [],
                    animations: [],
                    mediaQueries: [],
               };

               this.stack.forEach((item) => {
                    if (item.className) {
                         HandleStyleObject(
                              item,
                              this.current.selectors,
                              this.current.mediaQueries,
                              this.current.animations
                         );
                    }
               });

               const exported = Handler.export(
                    this.current.selectors,
                    this.current.animations,
                    this.current.mediaQueries
               );

               const newStyle = exported.ss;

               if (RecursiveDOM.devMode) {
                    if (exported.warnings.animation) {
                         console.warn(exported.warnings.animation);
                    }
                    if (exported.warnings.selectors) {
                         console.warn(exported.warnings.selectors);
                    }
               }

               if (this.sheet !== newStyle) {
                    this.appStyle.innerHTML = newStyle;
                    this.sheet = newStyle;
               }

               this.stack = [];
          });

          addEventListener(RecursiveEvents.EVENTS._STYLE_STATIC_COMPUTE, (e) => {
               const ss = Handler.exportStatic(e.detail);
               if (ss !== this.staticSheet) {
                    this.appStaticStyle.innerHTML = ss;
               }
          });
     }

     static setStyle(styleSheet) {
          RecursiveEvents.sendStaticStyleSheet(styleSheet);
     }
}

export default RecursiveCSSOM;
