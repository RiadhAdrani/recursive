import CreateComponent from "../../CreateComponent.js";

/**
 * ## ObjectView `<object>`
 * *from MDN Docs*
 * ### The External Object element
 * The ``<object>`` HTML element represents an external resource, which can be treated as an image,
 * a nested browsing context, or a resource to be handled by a plugin.
 * @param param.data The address of the resource as a valid URL. At least one of data and type must be defined.
 * @param param.form The form element, if any, that the object element is associated with (its form owner).
 * @param param.height The height of the displayed resource in pixel
 * @param param.name The name of valid browsing context
 * @param param.type The content type of the resource specified by data. At least one of data and type must be defined.
 * @param param.useMap A hash-name reference to a ``<map>`` element;
 * that is a '#' followed by the value of a name of a map element.
 * @param param.width The width of the display resource in pixel
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object
 */
export default ({
     style,
     styleSheet,
     id,
     className,
     data,
     form,
     height,
     name,
     type,
     useMap,
     width,
     events,
     renderIf = true,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "object",
          inlineStyle: style,
          renderIf,
          props: { id, data, form, height, name, type, useMap, width },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
