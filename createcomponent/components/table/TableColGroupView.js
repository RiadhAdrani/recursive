import CreateComponent from "../../CreateComponent.js";

/**
 * ## TableBodyView `<colgroup>`
 * *from MDN Docs*
 * ###  The Table Column Group element
 * The ``<colgroup>`` HTML element defines a group of columns within a table.
 * @param span This attribute contains a positive integer indicating the number of
 * consecutive columns the ``<colgroup>`` element spans.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup
 */
export default ({ children, style, styleSheet, id, span, className, events, hooks, flags }) =>
     new CreateComponent({
          children,
          tag: "colgroup",
          inlineStyle: style,
          props: { id, span },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
