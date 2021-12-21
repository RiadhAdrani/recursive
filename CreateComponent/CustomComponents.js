export default () => {
     class HTMLContainer extends HTMLElement {
          constructor() {
               super();
          }
     }

     customElements.define("html-container", HTMLContainer, { extends: "div" });
};
