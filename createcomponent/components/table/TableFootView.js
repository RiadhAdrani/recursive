import CreateComponent from "../../CreateComponent.js";

/**
 * ## TableFootView `<tfoot>`
 * *from MDN Docs*
 * ### The Table Foot element
 * The ``<tfoot>`` HTML element defines a set of rows summarizing the columns of the table.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot
 */
export default ({ children, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          children,
          tag: "tfoot",
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
