import CreateComponent from "../../CreateComponent.js";

/**
 * ## ImageView `<img>`
 * *from MDN Docs*
 * ### The Image Embed element
 * The ``<img>`` HTML element embeds an image into the document.
 * @param param.alt Defines an alternative text description of the image.
 * @param param.crossOrigin Indicates if the fetching of the image must be done using a CORS request
 * @param param.decoding Provides an image decoding hint to the browser
 * @param param.height The intrinsic height of the image, in pixels. Must be an integer without a unit.
 * @param param.isMap This Boolean attribute indicates that the image is part of a server-side map.
 * If so, the coordinates where the user clicked on the image are sent to the server.
 * @param param.referrerPolicy A string indicating which referrer to use when fetching the resource
 * @param param.sizes One or more strings separated by commas, indicating a set of source sizes.
 * @param param.src The image URL. Mandatory for the ``<img>`` element. On browsers supporting srcset,
 * src is treated like a candidate image with a pixel density descriptor 1x,
 * unless an image with this pixel density descriptor is already defined in srcset,
 * or unless srcset contains w descriptors.
 * @param param.srcSet One or more strings separated by commas,
 * indicating possible image sources for the user agent to use.
 * @param param.width The intrinsic width of the image in pixels. Must be an integer without a unit.
 * @param param.useMap The partial URL (starting with #) of an image map associated with the element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img
 */
export default ({
     style,
     styleSheet,
     id,
     alt,
     crossOrigin,
     decoding,
     height,
     isMap,
     referrerPolicy,
     sizes,
     src,
     srcSet,
     width,
     useMap,
     className,
     events,
     renderIf = true,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "img",
          inlineStyle: style,
          renderIf,
          props: {
               id,
               alt,
               crossOrigin,
               decoding,
               height,
               isMap,
               referrerPolicy,
               sizes,
               src,
               srcSet,
               width,
               useMap,
          },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
