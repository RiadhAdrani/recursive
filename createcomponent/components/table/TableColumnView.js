import CreateComponent from "../../CreateComponent.js";

/**
 * ## TableColumnView `<col>`
 * *from MDN Docs*
 * ### The Table Column element
 * The ``<col>`` HTML element defines a column within a table
 * and is used for defining common semantics on all common cells.
 * It is generally found within a ``<colgroup>`` element.
 * @param param.span This attribute contains a positive integer indicating
 * the number of consecutive columns the ``<col>`` element spans.
 * If not present, its default value is 1.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col
 */
export default ({
     children,
     style,
     styleSheet,
     id,
     span,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          children,
          tag: "col",
          inlineStyle: style,
          renderIf,
          props: { id, span },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
