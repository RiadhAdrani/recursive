import CreateComponent from "../../CreateComponent.js";

/**
 * ## ObjectParameterView `<param>`
 * *from MDN Docs*
 * ### The Object Parameter element
 * The ``<param>`` HTML element defines parameters for an <object> element.
 * @param param.name Name of the parameter.
 * @param param.value Specifies the value of the parameter.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/param
 */
export default ({
     style,
     styleSheet,
     id,
     name,
     value,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          tag: "param",
          inlineStyle: style,
          renderIf,
          props: { id, name, value },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
