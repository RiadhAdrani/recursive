import CreateComponent from "../../CreateComponent.js";

/**
 * ## LabelView `<label>`
 * *from MDN Docs*
 * ### The Input Label element
 * The ``<label>`` HTML element represents a caption for an item in a user interface.
 * @param param.for The value of the for attribute must be a single id
 * for a labelable form-related element in the same document as the ``<label>`` element.
 * So, any given label element can be associated with only one form control.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
 */
export default ({ text, style, styleSheet, id, isFor, className, events, hooks, flags }) =>
     new CreateComponent({
          children: text,
          tag: "label",
          inlineStyle: style,
          props: { id, isFor },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
