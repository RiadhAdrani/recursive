import CreateComponent from "../../CreateComponent.js";

/**
 * ## StrongTextView `<strong>`
 * *from MDN Docs*
 * ### The Strong Importance element
 * The ``<strong>`` HTML element indicates that its contents have strong importance, seriousness, or urgency.
 * Browsers typically render the contents in bold type.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong
 */
export default ({ text, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "strong",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
