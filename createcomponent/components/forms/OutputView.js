import CreateComponent from "../../CreateComponent.js";

/**
 * ## OutputView `<output>`
 * *from MDN Docs*
 * ### The Output element
 * The ``<output>`` HTML element is a container element into which a site or app
 * can inject the results of a calculation or the outcome of a user action.
 * @param param.for A space-separated list of other elements’ ids,
 * indicating that those elements contributed input values to (or otherwise affected) the calculation.
 * @param param.form The ``<form>`` element to associate the output with (its form owner).
 * @param param.name The element's name
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output
 */
export default ({
     text,
     style,
     styleSheet,
     id,
     isFor,
     form,
     name,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          children: text,
          tag: "optgroup",
          inlineStyle: style,
          renderIf,
          props: { id, isFor, form, name },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
