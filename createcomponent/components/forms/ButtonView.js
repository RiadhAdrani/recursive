import CreateComponent from "../../CreateComponent.js";

/**
 * ## ButtonView `<button>`
 * *from MDN Docs*
 * ### The Button element
 * The ``<button>`` HTML element represents a clickable button,
 * used to submit forms or anywhere in a document for accessible,
 * standard button functionality.
 * @param param.autofocus This Boolean attribute specifies that the button
 * should have input focus when the page loads.
 * @param param.disabled This Boolean attribute prevents the user from interacting with the button:
 * it cannot be pressed or focused.
 * @param param.form The ``<form>`` element to associate the button with (its form owner).
 * @param param.formAction The URL that processes the information submitted by the button.
 * @param param.formEncType If the button is a submit button (it's inside/associated with a ``<form>``
 * and doesn't have type="button"), specifies how to encode the form data that is submitted.
 * @param param.formMethod If the button is a submit button (it's inside/associated with a ``<form>``
 * and doesn't have type="button"), this attribute specifies the HTTP method used to submit the form.
 * @param param.formNoValidate If the button is a submit button, this Boolean attribute specifies
 * that the form is not to be validated when it is submitted.
 * @param param.formTarget If the button is a submit button,
 * this attribute is an author-defined name or standardized,
 * underscore-prefixed keyword indicating where to display the response from submitting the form.
 * @param param.name The name of the button
 * @param param.type The default behavior of the button.
 * @param param.value Defines the value associated with the button’s name when it’s submitted with the form data.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
 */
export default ({
     text,
     style,
     styleSheet,
     id,
     autofocus,
     disabled,
     form,
     formAction,
     formEncType,
     formMethod,
     formNoValidate,
     formTarget,
     name,
     type,
     value,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          children: text,
          tag: "button",
          inlineStyle: style,
          renderIf,
          props: {
               id,
               autofocus,
               disabled,
               form,
               formAction,
               formEncType,
               formMethod,
               formNoValidate,
               formTarget,
               name,
               type,
               value,
          },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
