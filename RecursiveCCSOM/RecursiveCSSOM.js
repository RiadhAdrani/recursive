import HandleStyleObject from "./HandleStyleObject.js";
import Handler from "./HandleStyle.js";
import RecursiveDOM from "../RecursiveDOM/RecursiveDOM.js";
import { throwError } from "@riadh-adrani/recursive/RecursiveDOM/RecursiveError";

class RecursiveCSSOM {
     static singleton = new RecursiveCSSOM();

     constructor() {
          if (RecursiveCSSOM.singleton instanceof RecursiveCSSOM) {
               throwError("RecrusiveCSSOM cannot have more than one instance", [
                    "RecrusiveCSSOM is an internal class and should not be used in development.",
               ]);
          }

          this.appStyle = document.createElement("style");
          this.appStaticStyle = document.createElement("style");

          document.querySelector("head").append(this.appStaticStyle);
          document.querySelector("head").append(this.appStyle);

          this.sheet = "";
          this.staticSheet = "";

          this.current = {
               selectors: [],
               animations: [],
               mediaQueries: [],
          };
     }

     update(stack) {
          this.current = {
               selectors: [],
               animations: [],
               mediaQueries: [],
          };

          stack.forEach((item) => {
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
     }

     injectStaticStyle(styleSheet) {
          const ss = Handler.exportStatic(styleSheet);
          if (ss !== this.staticSheet) {
               this.appStaticStyle.innerHTML = ss;
          }
     }
}

export default RecursiveCSSOM;
