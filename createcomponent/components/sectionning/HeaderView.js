import CreateComponent from "../../CreateComponent.js";

/**
 * ## HeaderView `<header>`
 * *from MDN Docs*
 *
 * The ``<header>`` HTML element represents introductory content, typically a group of introductory or navigational aids. It may contain some heading elements but also a logo, a search form, an author name, and other elements.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
 */

export default ({ children, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "header",
          children: children,
          inlineStyle: style,
          props: { id },
          renderIf,
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
