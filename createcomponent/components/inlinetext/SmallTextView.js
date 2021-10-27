import CreateComponent from "../../CreateComponent.js";

/**
 * ## SmallTextView `<small>`
 * *from MDN Docs*
 * ### The side comment element
 * The ``<small>`` HTML element represents side-comments and small print, like copyright and legal text,
 * independent of its styled presentation.
 * By default, it renders text within it one font-size smaller, such as from small to x-small.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small
 */
export default ({ text, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "small",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
