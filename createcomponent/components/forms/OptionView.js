import CreateComponent from "../../CreateComponent.js";

/**
 * ## OptionView `<option>`
 * *from MDN Docs*
 * ### The HTML Option element
 * The ``<option>`` HTML element is used to define an item contained in a ``<select>``, an <optgroup>,
 * or a ``<datalist>`` element.
 * As such, ``<option>`` can represent menu items in popups and other lists of items in an HTML document.
 * @param param.disabled If this Boolean attribute is set, this option is not checkable.
 * @param param.label This attribute is text for the label indicating the meaning of the option.
 * @param param.selected If present, this Boolean attribute indicates that the option is initially selected.
 * @param param.value The content of this attribute represents the value to be submitted with the form, should this option be selected.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option
 */
export default ({
     text,
     style,
     styleSheet,
     id,
     className,
     disabled,
     label,
     selected,
     value,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children: text,
          tag: "option",
          inlineStyle: style,
          props: { id, disabled, label, selected, value },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
