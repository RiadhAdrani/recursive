import CreateComponent from "../../CreateComponent.js";

/**
 * ## PictureView `<picture>`
 * *from MDN Docs*
 * ### The Picture element
 * The ``<picture>`` HTML element contains zero or more <source> elements and one ``<img>``
 * element to offer alternative versions of an image for different display/device scenarios.
 * The browser will consider each child <source> element and choose the best match among them.
 * If no matches are found—or the browser doesn't support the ``<picture>``
 * element—the URL of the ``<img>`` element's src attribute is selected.
 * The selected image is then presented in the space occupied by the ``<img>`` element.
 * a nested browsing context, or a resource to be handled by a plugin.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
 */
export default ({ children, style, styleSheet, id, className, events, hooks, flags }) =>
     new CreateComponent({
          children,
          tag: "picture",
          inlineStyle: style,
          props: { id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
