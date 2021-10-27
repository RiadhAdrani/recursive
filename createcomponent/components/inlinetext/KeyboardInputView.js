import CreateComponent from "../../CreateComponent.js";

/**
 * ## KeyboardInputView `<kbd>`
 * *from MDN Docs*
 * ### The Keyboard Input element
 * The ``<kbd>`` HTML element represents a span of inline text denoting textual user input from a keyboard,
 * voice input, or any other text entry device.
 * By convention, the user agent defaults to rendering the contents of a ``<kbd>`` element
 * using its default monospace font, although this is not mandated by the HTML standard.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd
 */
export default ({ text, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "kdb",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
