import CreateComponent from "../../CreateComponent.js";

/**
 * ## FormView `<form>`
 * *from MDN Docs*
 * ### The Form element
 * The ``<form>`` HTML element represents a document section containing interactive
 * controls for submitting information
 * @param param.acceptCharset Space-separated character encodings the server accepts
 * @param param.autoComplete Indicates whether input elements can by default have their values automatically completed by the browser
 * @param param.name The name of the form.
 * @param param.rel Creates a hyperlink or annotation depending on the value
 * @param param.action The URL that processes the form submission.
 * @param param.encType If the value of the method attribute is post, enctype is the MIME type of the form submission.
 * @param param.method The HTTP method to submit the form with.
 * @param param.noValidate This Boolean attribute indicates that the form shouldn't be validated when submitted.
 * @param param.target Indicates where to display the response after submitting the form.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
 */
export default ({
     children,
     style,
     styleSheet,
     id,
     acceptCharSet,
     autoComplete,
     name,
     rel,
     action,
     encType,
     method,
     noValidate,
     target,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children,
          tag: "form",
          inlineStyle: style,
          props: {
               id,
               acceptCharSet,
               autoComplete,
               name,
               rel,
               action,
               encType,
               method,
               noValidate,
               target,
          },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
