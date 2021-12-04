import CreateComponent from "../../CreateComponent.js";

/**
 * ## TextAreaView `<textarea>`
 * *from MDN Docs*
 * ### The Textarea element
 * The ``<textarea>`` HTML element represents a multi-line plain-text editing control,
 * useful when you want to allow users to enter a sizeable amount of free-form text,
 * for example a comment on a review or feedback form.
 * @param param.autoComplete This attribute indicates whether the value of the control can be automatically completed by the browser.
 * @param param.autofocus This Boolean attribute lets you specify that a form control should have input focus when the page loads.
 * @param param.cols The visible width of the text control, in average character widths.
 * @param param.disabled This Boolean attribute indicates that the user cannot interact with the control.
 * @param param.form The form element that the ``<textarea>`` element is associated with (its "form owner").
 * @param param.maxLength The maximum number of characters (UTF-16 code units) that the user can enter.
 * @param param.minLength The minimum number of characters (UTF-16 code units) required that the user should enter.
 * @param param.name The name of the control.
 * @param param.placeholder A hint to the user of what can be entered in the control.
 * @param param.readOnly This Boolean attribute indicates that the user cannot modify the value of the control.
 * @param param.required This attribute specifies that the user must fill in a value before submitting a form.
 * @param param.rows The number of visible text lines for the control.
 * @param param.spellCheck Specifies whether the ``<textarea>`` is subject to spell checking by the underlying browser/OS.
 * @param param.wrap Indicates how the control wraps text.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
 */
export default ({
     text,
     style,
     styleSheet,
     id,
     autoComplete,
     autofocus,
     cols,
     disabled,
     form,
     maxLength,
     minLength,
     name,
     placeholder,
     readOnly,
     required,
     rows,
     spellCheck,
     wrap,
     className,
     events,
     renderIf = true,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children: text,
          tag: "textarea",
          inlineStyle: style,
          renderIf,
          props: {
               id,
               autoComplete,
               autofocus,
               cols,
               disabled,
               form,
               maxLength,
               minLength,
               name,
               placeholder,
               readOnly,
               required,
               rows,
               spellCheck,
               wrap,
          },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
