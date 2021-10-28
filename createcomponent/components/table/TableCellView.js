import CreateComponent from "../../CreateComponent.js";

/**
 * ## TableBodyView `<td>`
 * *from MDN Docs*
 * ###  The Table Data Cell element
 * The ``<td>`` HTML element defines a cell of a table that contains data.
 * It participates in the table model.
 * @param param.colSpan This attribute contains a non-negative integer value that indicates for how many columns the cell extends.
 * @param param.headers This attribute contains a list of space-separated strings,
 * each corresponding to the id attribute of the ``<th>`` elements that apply to this element.
 * @param param.rowSpan This attribute contains a non-negative integer value that indicates for how many rows the cell extends.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td
 */
export default ({
     children,
     style,
     styleSheet,
     id,
     colSpan,
     headers,
     rowSpan,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          children,
          tag: "td",
          inlineStyle: style,
          renderIf,
          props: { id, colSpan, headers, rowSpan },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
