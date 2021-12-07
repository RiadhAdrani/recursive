import CreateComponent from "../../CreateComponent.js";

/**
 * ## RubyFallBackView `<rp>`
 * *from MDN Docs*
 * ### The Ruby Fallback Parenthesis element
 * The ``<rp>`` HTML element is used to provide fall-back parentheses for browsers
 * that do not support display of ruby annotations using the <ruby> element.
 * One ``<rp>`` element should enclose each of the opening and closing parentheses
 * that wrap the <rt> element that contains the annotation's text.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rp
 */
export default ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "rp",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
