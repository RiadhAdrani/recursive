import CreateComponent from "../../CreateComponent.js";

/**
 * ## DividerView `<div>`
 * *from MDN Docs*
 * ### The Content Division element
 * The ``<div>`` HTML element is the generic container for flow content.
 * It has no effect on the content or layout until styled in some way using CSS
 * (e.g. styling is directly applied to it,
 * or some kind of layout model like Flexbox is applied to its parent element).
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
 */
export default ({ children, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "div",
          children: children,
          inlineStyle: style,
          props: { id },
          className: className,
          events,
          style: styleSheet,
          hooks,
          flags,
     });
