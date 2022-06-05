import PropList from "../recursive-dom/PropList.js";

export default {
    /**
     * Convert a json into text
     * @param {JSON} json style as json.
     * @param {string} indentation add indentation before css declaration
     */
    convertSelectorContent: function (json, indentation = "") {
        let output = "";

        for (let attr in json) {
            if (PropList.CssAttributes[attr])
                output += `${indentation}${PropList.CssAttributes[attr]}:${json[attr]};`;
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
            steps += `${item}{${this.convertSelectorContent(animation.steps[`${item}`])}}`;
        }
        return `@keyframes ${animation.name}{${steps}}`;
    },
    /**
     * Convert media Queries to css format
     * @param {JSON} mediaQueries processed media queries
     */
    convertMediaQueries: function (mediaQueries, isClass = true) {
        let mediaQueryText = "";
        for (var cond in mediaQueries) {
            mediaQueryText += `@media ${cond}{`;
            for (var s in mediaQueries[cond]) {
                mediaQueryText += `${isClass ? "." : ""}${s}{${this.convertSelectorContent(
                    mediaQueries[cond][s]
                )}}`;
            }
            mediaQueryText += "}";
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
                output += `${prop}:${ffobject[prop]};`;
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

        let output = "";

        if (cssobject["import"]) {
            for (let item in cssobject.import) {
                output += `@import ${cssobject.import[item]};`;
            }
        }

        if (cssobject["font"]) {
            output += `@font-face {${this.convertFontFace(cssobject.font)}}`;
        }

        if (cssobject["charset"]) {
            output += "";
            for (let item in cssobject.charset) {
                output += `@charset "${cssobject.font[item]}";`;
            }
        }

        if (cssobject["selectors"]) {
            for (let rule in cssobject.selectors) {
                output += `${rule}{${this.convertSelectorContent(cssobject.selectors[rule], "")}}`;
            }
        }

        if (cssobject["media"]) {
            output += "";
            output += this.convertMediaQueries(cssobject.media, false);
        }

        if (cssobject["animations"]) {
            output += "\n";
            for (let anim in cssobject.animations) {
                output += this.convertAnimation({
                    name: anim,
                    steps: cssobject.animations[anim],
                });
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
        let output = "";
        css.forEach((s) => {
            output += `${s.selector}{${this.convertSelectorContent(s.content)}}`;
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
        for (var attr of Object.keys(oldS)) {
            if (!newS[attr]) {
                newS[attr] = oldS[attr];
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
    export: function (css, animations, mediaQueries, oldStyleText, devMode) {
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

        const warnings = {
            animation:
                animationDup.length > 0
                    ? `DUPLICATE ANIMATION${
                          animationDup.length > 1 ? "S" : ""
                      }: (${animationDup}) => found more than once`
                    : false,
            selectors:
                styleDup.length > 0
                    ? `DUPLICATE STYLE${
                          styleDup.length > 1 ? "S" : ""
                      }: (${styleDup}) => found more than once.`
                    : false,
        };

        return { ss, warnings };
    },
};
