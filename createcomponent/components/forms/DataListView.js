import CreateComponent from "../../CreateComponent.js";

/**
 * ## DataListView `<datalist>`
 * *from MDN Docs*
 * ### The HTML Data List element
 * The ``<datalist>`` HTML element contains a set of <option> elements that represent
 * the permissible or recommended options available to choose from within other controls.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
 */
export default ({ children, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          children,
          tag: "datalist",
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
