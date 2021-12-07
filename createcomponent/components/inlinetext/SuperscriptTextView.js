import CreateComponent from "../../CreateComponent.js";

/**
 * ## SuperscriptTextView `<sup>`
 * *from MDN Docs*
 * ### The Superscript element
 * The ``<sup>`` HTML element specifies inline text
 * which is to be displayed as superscript for solely typographical reasons.
 * Superscripts are usually rendered with a raised baseline using smaller text
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup
 */
export default ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "sup",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
