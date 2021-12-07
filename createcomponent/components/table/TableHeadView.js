import CreateComponent from "../../CreateComponent.js";

/**
 * ## TableHeadView `<thead>`
 * *from MDN Docs*
 * ###  The Table Head element
 * The ``<thead>`` HTML element defines a set of rows defining the head of the columns of the table.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead
 */
export default ({ children, style, styleSheet, id, className, events, flags, hooks }) =>
     new CreateComponent({
          children,
          tag: "thead",
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
