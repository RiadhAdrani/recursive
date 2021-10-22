import solveduplicateselectors from "./solveduplicateselectors.js";

/**
 * Handle and Translate mediaQueries to be processed by the VDOM.
 * @param {Array} mediaQueries an array of media queries
 */
export default (mediaQueries) => {
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
          mqf[cond] = solveduplicateselectors(mqs[cond]);
     }

     return mqf;
};
