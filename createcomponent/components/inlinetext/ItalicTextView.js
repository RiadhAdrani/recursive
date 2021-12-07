import CreateComponent from "../../CreateComponent.js";

/**
 * ## ItalicTextView `<i>`
 * *from MDN Docs*
 * ### The Idiomatic Text element
 * The ``<i>`` HTML element represents a range of text that is set off from the normal text for some reason,
 * such as idiomatic text, technical terms, taxonomical designations,
 * among others. Historically, these have been presented using italicized type,
 * which is the original source of the ``<i>`` naming of this element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i
 */
export default ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "i",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
