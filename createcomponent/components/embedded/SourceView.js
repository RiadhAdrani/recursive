import CreateComponent from "../../CreateComponent.js";

/**
 * ## SourceView `<source>`
 * *from MDN Docs*
 * ### The Media or Image Source element
 * he ``<source>`` HTML element specifies multiple media resources for the ``<picture>``,
 * the ``<audio>`` element, or the ``<video>`` element. It is an empty element,
 * meaning that it has no content and does not have a closing tag.
 * It is commonly used to offer the same media content in multiple file formats
 * in order to provide compatibility with a broad range of browsers given their differing
 * support for image file formats and media file formats.
 * @param param.media Media query of the resource's intended media.
 * @param param.sizes Is a list of source sizes that describes the final rendered width of the image represented by the source
 * @param param.src Required for ``<audio>`` and ``<video>``, address of the media resource.
 * @param param.srcSet A list of one or more strings separated by commas indicating a set of possible images represented by the source for the browser to use.
 * @param param.type The MIME media type of the resource, optionally with a codecs parameter.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source
 */
export default ({
     style,
     styleSheet,
     id,
     media,
     sizes,
     src,
     srcSet,
     type,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "source",
          inlineStyle: style,
          props: { id, media, sizes, src, srcSet, type },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
