import CreateComponent from "../../CreateComponent.js";

/**
 * ## InputView `<form>`
 * *from MDN Docs*
 * ### The Input (Form Input) element
 * The ``<input>`` HTML element is used to create interactive controls for web-based forms
 * in order to accept data from the user;
 * a wide variety of types of input data and control widgets are available,
 * depending on the device and user agent. The ``<input>`` element is one of the most powerful and complex
 * in all of HTML due to the sheer number of combinations of input types and attributes.
 * @param param.type How an <input> works varies considerably depending on the value of its type attribute,
 * hence the different types are covered in their own separate reference pages.
 * If this attribute is not specified, the default type adopted is text.
 * #### Check the link below for detailed information about each type of input.
 * * `button`
 * * `checkbox`
 * * `color`
 * * `date`
 * * `datetime-local`
 * * `email`
 * * `file`
 * * `hidden`
 * * `image`
 * * `month`
 * * `number`
 * * `password`
 * * `radio`
 * * `range`
 * * `reset`
 * * `search`
 * * `submit`
 * * `tel`
 * * `text`
 * * `time`
 * * `urm`
 * * `week`
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
 */
export default ({
     style,
     styleSheet,
     id,
     className,
     events,
     hooks,
     accept,
     alt,
     autoComplete,
     autofocus,
     capture,
     checked,
     dirname,
     disabled,
     form,
     formAction,
     formEncType,
     formMethod,
     formNoValidate,
     formTarget,
     height,
     list,
     max,
     maxLength,
     min,
     minLength,
     multiple,
     name,
     pattern,
     placeholder,
     readOnly,
     required,
     size,
     src,
     step,
     type,
     value,
     width,
     flags,
}) =>
     new CreateComponent({
          tag: "input",
          inlineStyle: style,
          props: {
               id,
               type,
               accept,
               alt,
               autoComplete,
               autofocus,
               capture,
               checked,
               dirname,
               disabled,
               form,
               formAction,
               formEncType,
               formMethod,
               formNoValidate,
               formTarget,
               height,
               list,
               max,
               maxLength,
               min,
               minLength,
               multiple,
               name,
               pattern,
               placeholder,
               readOnly,
               required,
               size,
               src,
               step,
               value,
               width,
          },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
