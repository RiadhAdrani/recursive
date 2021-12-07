import CreateComponent from "../../CreateComponent.js";

/**
 * ## TableView `<table>`
 * *from MDN Docs*
 * ### The Table element
 * The ``<table>`` HTML element represents tabular data — that is,
 * information presented in a two-dimensional table comprised of rows and columns of cells containing data.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
 */
export default ({ children, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          children,
          tag: "table",
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
