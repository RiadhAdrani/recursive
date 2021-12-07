import CreateComponent from "../../CreateComponent.js";

/**
 * ## CodeView `<code>`
 * *from MDN Docs*
 * ### The Inline Code element
 * The ``<code>`` HTML element displays its contents styled in a fashion intended
 * to indicate that the text is a short fragment of computer code.
 * By default, the content text is displayed using the user agent's default monospace font.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code
 */
export default ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "code",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
