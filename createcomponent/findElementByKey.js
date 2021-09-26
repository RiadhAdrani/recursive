export default (component, key) => {
     var elems = document.querySelector("#app").getElementsByTagName("*");

     for (let i = 0; i < elems.length; i++) {
          if (key) {
               if (elems[i].key == key) {
                    return elems[i];
               }
          } else {
               if (elems[i].key == component.key) {
                    return elems[i];
               }
          }
     }
     return undefined;
};
