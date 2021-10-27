import CreateComponent from "../../CreateComponent.js";

/**
 * ## EmphasisTextView `<em>`
 * *from MDN Docs*
 * ### The Definition element
 * The ``<em>`` HTML element marks text that has stress emphasis.
 * The ``<em>`` element can be nested, with each level of nesting indicating a greater degree of emphasis.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em
 */
export default ({ text, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "em",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
