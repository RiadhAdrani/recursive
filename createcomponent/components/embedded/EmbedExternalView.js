import CreateComponent from "../../CreateComponent.js";

/**
 * ## EmbedExternalView `<embed>`
 * *from MDN Docs*
 * ### The Embed External Content element
 * The ``<embed>`` HTML element embeds external content at the specified point in the document.
 * This content is provided by an external application or other source of interactive
 * content such as a browser plug-in.
 * @param param.height The displayed height of the resource in pixel
 * @param param.src The URL of the resource being embedded.
 * @param param.type The MIME type to use to select the plug-in to instantiate.
 * @param param.width The displayed width of the resource
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed
 */
export default ({
     style,
     styleSheet,
     id,
     height,
     src,
     type,
     width,
     className,
     events,
     renderIf = true,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "embed",
          inlineStyle: style,
          renderIf,
          props: { id, height, src, type, width },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
