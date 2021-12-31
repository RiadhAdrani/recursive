export default () => {
     const defaultStyles = [];

     // -------------------------------------------------------------------------------------------------------------------
     // HTML CONTAINER
     class HTMLContainer extends HTMLElement {
          constructor() {
               super();
          }
     }
     customElements.define("html-container", HTMLContainer, { extends: "div" });
     defaultStyles.push("html-container{display:block;}");

     // -------------------------------------------------------------------------------------------------------------------
     // VERTICAL SPACE
     class VerticalSpace extends HTMLElement {
          constructor() {
               super();
          }
     }
     customElements.define("empty-box", VerticalSpace, { extends: "img" });
     defaultStyles.push("empty-box{display:block;}");

     // -------------------------------------------------------------------------------------------------------------------
     // LIST VIEW
     class ListView extends HTMLElement {
          constructor() {
               super();
          }
     }
     customElements.define("list-view", ListView, { extends: "div" });
     defaultStyles.push("list-view{display:block;}");

     // -------------------------------------------------------------------------------------------------------------------
     // COLUMN VIEW
     class ColumnView extends HTMLDivElement {
          constructor() {
               super();
          }
     }
     customElements.define("column-view", ColumnView, { extends: "div" });
     defaultStyles.push("column-view{display:flex;flex-direction:column}");

     // -------------------------------------------------------------------------------------------------------------------
     // ROW VIEW
     class RowView extends HTMLDivElement {
          constructor() {
               super();
          }
     }
     customElements.define("row-view", RowView, { extends: "div" });
     defaultStyles.push("row-view{display:flex;flex-direction:row}");

     // -------------------------------------------------------------------------------------------------------------------
     // BORDER SPINNER
     class BorderSpinnerView extends HTMLDivElement {
          constructor() {
               super();
          }
     }
     customElements.define("border-spinner", BorderSpinnerView, { extends: "div" });
     defaultStyles.push("border-spinner{display:block;}");

     // -------------------------------------------------------------------------------------------------------------------
     // DEFAULT STYLES
     const customElementStyle = document.createElement("style");
     defaultStyles.forEach((rule) => {
          customElementStyle.innerText += rule;
     });

     document.querySelector("head").append(customElementStyle);
};
