import CreateComponent from "../../CreateComponent.js";

/**
 * ## HeaderTitleView `<header>`
 * *from MDN Docs*
 *
 * The `<h1>` to `<h6>` HTML elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
 */
export default ({ text, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          tag: "h6",
          children: text,
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
