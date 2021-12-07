import CreateComponent from "../../CreateComponent.js";

/**
 * ## AreaView `<area>`
 * *from MDN Docs*
 * ### The Image Map Area element
 * The ``<area>`` HTML element defines an area inside an image map that has predefined clickable areas.
 * An image map allows geometric areas on an image to be associated with hypertext link.
 * This element is used only within a ``<map>`` element.
 * @param param.alt A text string alternative to display on browsers that do not display images.
 * The text should be phrased so that it presents the user with
 * the same kind of choice as the image would offer when displayed without the alternative text.
 * This attribute is required only if the href attribute is used.
 * @param param.coords The coords attribute details the coordinates of the shape attribute in size,
 * shape, and placement of an ``<area>``.
 * @param param.download This attribute, if present, indicates that the author intends the hyperlink to be used for downloading a resource.
 * See ``<a>`` for a full description of the download attribute.
 * @param param.href The hyperlink target for the area. Its value is a valid URL.
 * This attribute may be omitted; if so, the ``<area>`` element does not represent a hyperlink.
 * @param param.hrefLang Indicates the language of the linked resource
 * @param param.ping Contains a space-separated list of URLs to which, when the hyperlink is followed,
 * POST requests with the body PING will be sent by the browser (in the background).
 * Typically used for tracking.
 * @param param.referrerPolicy A string indicating which referrer to use when fetching the resource
 * @param param.rel For anchors containing the href attribute,
 * this attribute specifies the relationship of the target object to the link object.
 * The value is a space-separated list of link types values.
 * The values and their semantics will be registered by some authority
 * that might have meaning to the document author. The default relationship,
 * if no other is given, is void. Use this attribute only if the href attribute is present.
 * @param param.shape The shape of the associated hot spot.
 * The specifications for HTML defines the values rect,
 * which defines a rectangular region; circle, which defines a circular region;
 * poly, which defines a polygon; and default,
 * which indicates the entire region beyond any defined shapes.
 * @param param.target A keyword or author-defined name of the browsing context to display the linked resource.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area
 */
export default ({
     children,
     style,
     styleSheet,
     id,
     alt,
     coords,
     download,
     href,
     hrefLang,
     ping,
     referrerPolicy,
     rel,
     shape,
     target,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "area",
          children,
          inlineStyle: style,
          props: {
               id,
               alt,
               coords,
               download,
               href,
               href,
               hrefLang,
               ping,
               referrerPolicy,
               rel,
               shape,
               target,
          },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
