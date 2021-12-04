import CreateComponent from "../../CreateComponent.js";

/**
 * ## TableBodyView `<tbody>`
 * *from MDN Docs*
 * ###  The Table Body element
 * The ``<tbody>`` HTML element encapsulates a set of table rows (``<tr>`` elements),
 * indicating that they comprise the body of the table (``<table>``).
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody
 */
export default ({
     children,
     style,
     styleSheet,
     id,
     className,
     events,
     renderIf = true,
     flags,
     hooks,
}) =>
     new CreateComponent({
          children,
          tag: "tbody",
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
