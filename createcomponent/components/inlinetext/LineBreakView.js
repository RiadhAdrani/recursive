import CreateComponent from "../../CreateComponent.js";

/**
 * ## LineBreakView `<br>`
 * *from MDN Docs*
 * ### The Line Break element
 * The ``<br>`` HTML element produces a line break in text (carriage-return).
 * It is useful for writing a poem or an address, where the division of lines is significant.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br
 */
export default ({ style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "br",
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
