import CreateComponent from "../../CreateComponent.js";

/**
 * ## MarkTextView `<mark>`
 * *from MDN Docs*
 * ### The Mark Text element
 * The ``<mark>`` HTML element represents text which is marked or highlighted for reference or notation purposes,
 * due to the marked passage's relevance or importance in the enclosing context.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark
 */
export default ({ text, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "mark",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
