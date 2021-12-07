import CreateComponent from "../../CreateComponent.js";

/**
 * ## CiteView `<cite>`
 * *from MDN Docs*
 * ### The Citation element
 * The ``<cite>`` HTML element is used to describe a reference to a cited creative work,
 * and must include the title of that work.
 * The reference may be in an abbreviated form according to context-appropriate conventions
 * related to citation metadata.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite
 */
export default ({ text, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "cite",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
