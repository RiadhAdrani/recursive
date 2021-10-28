import CreateComponent from "../../CreateComponent.js";

/**
 * ## TableRowView `<tr>`
 * *from MDN Docs*
 * ###  The Table Row element
 * The ``<tr>`` HTML element defines a row of cells in a table.
 * The row's cells can then be established using a mix of ``<td>`` (data cell) and ``<th>`` (header cell) elements.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr
 */
export default ({ children, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "tr",
          children,
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
