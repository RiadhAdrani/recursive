import CreateComponent from "../../CreateComponent.js";

/**
 * ## NavView `<nav>`
 * *from MDN Docs*
 * ### The Navigation Section element
 * The ``<nav>`` HTML element represents a section of a page whose purpose is to provide navigation links, either within the current document or to other documents. Common examples of navigation sections are menus, tables of contents, and indexes.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav
 */
export default ({ children, style, styleSheet, id, className, events, renderIf = true, hooks }) =>
     new CreateComponent({
          tag: "nav",
          children,
          inlineStyle: style,
          props: { id },
          renderIf,
          className,
          events,
          hooks,
          style: styleSheet,
     });
