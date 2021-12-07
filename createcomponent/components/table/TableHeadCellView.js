import CreateComponent from "../../CreateComponent.js";

/**
 * ## TableHeadCellView `<th>`
 * *from MDN Docs*
 * ###  The Table Header element
 * The ``<td>`` HTML element defines a cell of a table that contains data.
 * It participates in the table model.
 * @param param.abbreviation This attribute contains a short abbreviated description of the cell's content.
 * @param param.colSpan This attribute contains a non-negative integer value that indicates for how many columns the cell extends.
 * @param param.headers This attribute contains a list of space-separated strings,
 * each corresponding to the id attribute of the ``<th>`` elements that apply to this element.
 * @param param.rowSpan This attribute contains a non-negative integer value that indicates for how many rows the cell extends.
 * @param param.scope This enumerated attribute defines the cells that the header (defined in the ``<th>``) element relates to.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th
 */
export default ({
     children,
     style,
     styleSheet,
     abbreviation,
     colSpan,
     headers,
     rowSpan,
     scope,
     id,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children,
          tag: "th",
          inlineStyle: style,
          props: { id, abbreviation, colSpan, headers, rowSpan, scope },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
