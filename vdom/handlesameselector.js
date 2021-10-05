/**
 * Compute difference between two selectors of the same name.
 * @param {JSON} newS new style
 * @param {JSON} oldS old style
 * @returns {JSON} computed JSON style
 */
export default (newS, oldS) => {
     let alert = false;
     for (var attr of Object.keys(oldS)) {
          if (!newS[attr]) {
               newS[attr] = oldS[attr];
               alert = true;
          }
     }
     return newS;
};
