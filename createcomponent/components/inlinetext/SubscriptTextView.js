import CreateComponent from "../../CreateComponent.js";

/**
 * ## SubscriptTextView `<sub>`
 * *from MDN Docs*
 * ### The Subscript element
 * The ``<sub>`` HTML element specifies inline text
 * which should be displayed as subscript for solely typographical reasons.
 * Subscripts are typically rendered with a lowered baseline using smaller text.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub
 */
export default ({ text, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "sub",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
