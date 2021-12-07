import CreateComponent from "../../CreateComponent.js";

/**
 * ## SelectView `<select>`
 * *from MDN Docs*
 * ### The HTML Select element
 * The ``<select>`` HTML element represents a control that provides a menu of options:
 * @param param.autoComplete A DOMString providing a hint for a user agent's autocomplete feature.
 * @param param.autofocus This Boolean attribute lets you specify that a form control should have input focus when the page loads.
 * @param param.disabled This Boolean attribute indicates that the user cannot interact with the control.
 * @param param.form The ``<form>`` element to associate the ``<select>`` with (its form owner).
 * @param param.multiple This Boolean attribute indicates that multiple options can be selected in the list.
 * @param param.name This attribute is used to specify the name of the control.
 * @param param.required A Boolean attribute indicating that an option with a non-empty string value must be selected.
 * @param param.size If the control is presented as a scrolling list box (e.g. when multiple is specified),
 * this attribute represents the number of rows in the list that should be visible at one time.
 * Browsers are not required to present a select element as a scrolled list box. The default value is 0.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
 */
export default ({
     children,
     style,
     styleSheet,
     id,
     autoComplete,
     autofocus,
     disabled,
     form,
     multiple,
     required,
     size,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children,
          tag: "select",
          inlineStyle: style,
          props: { id, autoComplete, autofocus, disabled, form, multiple, required, size },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
