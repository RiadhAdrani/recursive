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
