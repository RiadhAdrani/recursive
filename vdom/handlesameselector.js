export default (newS, oldS) => {
     let alert = false;
     for (var attr of Object.keys(oldS)) {
          if (!newS[attr]) {
               newS[attr] = oldS[attr];
               alert = true;
          }
     }

     if (alert) {
          console.warn("CSS: found two selectors with same name but with different attributes");
     }
     return newS;
};
