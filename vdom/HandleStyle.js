import PropList from "./PropList.js";

export default {
     /**
      * Convert a json into text
      * @param {JSON} json style as json.
      * @param {string} indentation add indentation before css declaration
      */
     convertSelectorContent: function (json, indentation = "\t\t") {
          let output = "";

          for (let attr in json) {
               if (PropList.CssAttributes[attr])
                    output += `${indentation}${PropList.CssAttributes[attr]}:${json[attr]};\n`;
          }

          return output;
     },

     /**
      * Convert an animation json into css format.
      * @param animation animation as a JSON, with each key being a step of the animation ("0%", "100%"), and the value being a json of the style at the current state.
      */
     convertAnimation: function (animation) {
          let steps = "";
          for (const item in animation.steps) {
               steps += `\t${item}{\n${this.convertSelectorContent(
                    animation.steps[`${item}`]
               )}\t}\n`;
          }
          return `@keyframes ${animation.name}{\n${steps}}`;
     },
     /**
      * Convert media Queries to css format
      * @param {JSON} mediaQueries processed media queries
      */
     convertMediaQueries: function (mediaQueries, isClass = true) {
          let mediaQueryText = "\n";
          for (var cond in mediaQueries) {
               mediaQueryText += `@media ${cond}{\n`;
               for (var s in mediaQueries[cond]) {
                    mediaQueryText += `\t${isClass ? "." : ""}${s}{\n${this.convertSelectorContent(
                         mediaQueries[cond][s]
                    )}\t}\n`;
               }
               mediaQueryText += "}\n\n";
          }

          return mediaQueryText;
     },
     /**
      * @param {JSON} ffobject font face object to convert
      */
     convertFontFace: function (ffobject) {
          let output = "";

          for (let prop in ffobject) {
               if (PropList.FontFace[prop]) {
                    output += `\t${prop}:${ffobject[prop]};\n`;
               }
          }

          return output;
     },
     /**
      * Convert static style to string
      * @param {JSON} cssobject static style object
      */
     exportStatic: function (cssobject) {
          if (!cssobject) return;

          let output = "\n";

          if (cssobject["import"]) {
               for (let item in cssobject.import) {
                    output += `\n@import ${cssobject.import[item]};\n`;
               }
          }

          if (cssobject["font"]) {
               output += `@font-face {\n${this.convertFontFace(cssobject.font)}}\n`;
          }

          if (cssobject["charset"]) {
               output += "\n";
               for (let item in cssobject.charset) {
                    output += `@charset "${cssobject.font[item]}";\n`;
               }
          }

          if (cssobject["selectors"]) {
               for (let rule in cssobject.selectors) {
                    output += `\n${rule}{\n${this.convertSelectorContent(
                         cssobject.selectors[rule],
                         "\t"
                    )}}`;
               }
          }

          if (cssobject["media"]) {
               output += "\n";
               output += this.convertMediaQueries(cssobject.media, false);
          }

          if (cssobject["animations"]) {
               output += "\n";
               for (let anim in cssobject.animations) {
                    output +=
                         "\n" +
                         this.convertAnimation({ name: anim, steps: cssobject.animations[anim] }) +
                         "\n";
               }
          }

          return output;
     },
     /**
      * Apply CSS into the DOM
      * @param {Array} css array of style selectors
      * @param {Array} animations array of anumations
      * @param {Array} mediaQueries array of quereis
      */
     convertStyle: function (css, animations, mediaQueries) {
          let output = "\n";
          css.forEach((s) => {
               output += `\n${s.selector}{\n${this.convertSelectorContent(s.content)}}\n`;
          });
          animations.forEach((a) => {
               output += this.convertAnimation(a);
          });

          output += `${this.convertMediaQueries(this.prepareMediaQueries(mediaQueries))}`;

          return output;
     },
     /**
      * Compute difference between two selectors of the same name.
      * @param {JSON} newS new style
      * @param {JSON} oldS old style
      * @returns {JSON} computed JSON style
      */
     overrideSameSelector: function (newS, oldS) {
          let alert = false;
          for (var attr of Object.keys(oldS)) {
               if (!newS[attr]) {
                    newS[attr] = oldS[attr];
                    alert = true;
               }
          }
          return newS;
     },
     /**
      * Solve duplicate selectors inside a media query
      * @param {Array} array styles
      */
     solveDuplicateSelectors: function (array) {
          const output = {};

          for (let i in array) {
               if (output[`${array[i].selector}${PropList.CssSelectors[array[i].type]}`]) {
                    output[`${array[i].selector}${PropList.CssSelectors[array[i].type]}`] =
                         this.overrideSameSelector(
                              array[i].content,
                              output[`${array[i].selector}${PropList.CssSelectors[array[i].type]}`]
                         );
               } else
                    output[`${array[i].selector}${PropList.CssSelectors[array[i].type]}`] =
                         array[i].content;
          }

          return output;
     },
     /**
      * Handle and Translate mediaQueries to be processed by the VDOM.
      * @param {Array} mediaQueries an array of media queries
      */
     prepareMediaQueries: function (mediaQueries) {
          const mqs = {};
          if (mediaQueries.length > 0) {
               mediaQueries.forEach((item) => {
                    item.queries.forEach((query) => {
                         if (!mqs[query.condition]) {
                              mqs[query.condition] = [];
                         }
                         for (var t in query) {
                              if (t !== "condition") {
                                   mqs[query.condition].push({
                                        type: `${t}`,
                                        selector: item.className,
                                        content: query[t],
                                   });
                              }
                         }
                    });
               });
          }

          const mqf = {};
          for (var cond in mqs) {
               mqf[cond] = this.solveDuplicateSelectors(mqs[cond]);
          }

          return mqf;
     },
     /**
      * CSS Handler for the VDOM
      * @param css css style
      * @param animations css animations
      * @param mediaQueries css media queries
      * @param root style element inside the html document <style></style>
      * @param oldStyleText old style
      */
     export: function (css, animations, mediaQueries, root, oldStyleText) {
          let output = [];

          let outputAnimations = [];

          const styleDup = [];
          const animationDup = [];

          for (let i in css) {
               let found = false;

               for (let j in output) {
                    if (output[j].selector === css[i].selector) {
                         if (!styleDup.includes(output[j].selector)) {
                              styleDup.push(output[j].selector);
                         }

                         found = true;
                         this.overrideSameSelector(output[j].content, css[i].content);
                         break;
                    }
               }

               if (!found) {
                    output.push(css[i]);
               }
          }

          if (animations.length > 0) {
               for (let i in animations) {
                    let found = false;

                    for (let j in outputAnimations) {
                         if (outputAnimations[j].name === animations[i].name) {
                              found = true;

                              if (!animationDup.includes(outputAnimations[j].name)) {
                                   animationDup.push(outputAnimations[j].name);
                              }

                              outputAnimations = outputAnimations.filter(
                                   (a) => a.name !== outputAnimations[j].name
                              );
                              outputAnimations.push(animations[i]);
                              break;
                         }
                    }

                    if (!found) {
                         outputAnimations.push(animations[i]);
                    }
               }
          }

          const ss = this.convertStyle(output, outputAnimations, mediaQueries);

          if (oldStyleText !== ss) {
               root.innerHTML = ss;
          }

          if (vDOM.devMode) {
               if (animationDup.length > 0) {
                    console.warn(
                         `DUPLICATE ANIMATION${
                              animationDup.length > 1 ? "S" : ""
                         }: (${animationDup}) => found more than once`
                    );
               }

               if (styleDup.length > 0) {
                    console.warn(
                         `DUPLICATE STYLE${
                              styleDup.length > 1 ? "S" : ""
                         }: (${styleDup}) => found more than once.`
                    );
               }
          }

          return ss;
     },
};
