import CSSSelectors from "./RecursiveCSSSelectors.js";

function DuplicateSelectorsHandler(array) {
    const output = {};

    for (let i in array) {
        if (output[`${array[i].selector}${CSSSelectors[array[i].type]}`]) {
            output[`${array[i].selector}${CSSSelectors[array[i].type]}`] = SameSelectorHandler(
                array[i].content,
                output[`${array[i].selector}${CSSSelectors[array[i].type]}`]
            );
        } else output[`${array[i].selector}${CSSSelectors[array[i].type]}`] = array[i].content;
    }

    return output;
}

function PrepareMediaQueries(mediaQueries) {
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
        mqf[cond] = DuplicateSelectorsHandler(mqs[cond]);
    }

    return mqf;
}

function SameSelectorHandler(newS, oldS) {
    for (var attr of Object.keys(oldS)) {
        if (!newS[attr]) {
            newS[attr] = oldS[attr];
        }
    }
    return newS;
}

export { DuplicateSelectorsHandler, PrepareMediaQueries, SameSelectorHandler };
