import CreateComponent from "../../CreateComponent.js";

/**
 * ## MapView `<map>`
 * *from MDN Docs*
 * ### The Image Map element
 * The ``<map>`` HTML element is used with <area> elements to define an image map (a clickable link area).
 * @param param.name The name attribute gives the map a name so that it can be referenced.
 * The attribute must be present and must have a non-empty value with no space characters.
 * The value of the name attribute must not be equal to the value of the name attribute of another
 * ``<map>`` element in the same document.
 * If the id attribute is also specified, both attributes must have the same value.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map
 */
export default ({
     text,
     style,
     styleSheet,
     id,
     name,
     className,
     events,
     renderIf = true,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "map",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { id, name },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
