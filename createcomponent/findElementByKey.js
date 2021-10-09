/**
 * Return the equivalent of component in the DOM as htmlElement.
 * @param component find componentr)
 */
export default (component) => {
     var elems = document.querySelectorAll(component.tag);

     for (let i = 0; i < elems.length; i++) {
          if (elems[i].key == component.key) {
               return elems[i];
          }
     }
};
