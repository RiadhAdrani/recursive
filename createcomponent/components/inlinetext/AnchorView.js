import CreateComponent from "../../CreateComponent.js";

/**
 * ## AnchorView `<a>`
 * *from MDN Docs*
 * ### The Anchor element
 * The ``<a>`` HTML element (or anchor element), with its href attribute,
 * creates a hyperlink to web pages, files, email addresses, locations in the same page,
 * or anything else a URL can address.
 * Content within each ``<a>`` should indicate the link's destination.
 * If the href attribute is present, pressing the enter key while focused on the ``<a>`` element will activate it.
 * @param param.download Prompts the user to save the linked URL instead of navigating to it.
 * Can be used with or without a value
 * @param param.href The URL that the hyperlink points to. Links are not restricted to HTTP-based URLs —
 * they can use any URL scheme supported by browsers
 * @param param.hrefLang Hints at the human language of the linked URL. No built-in functionality.
 * Allowed values are the same as the global lang attribute.
 * @param param.ping A space-separated list of URLs. When the link is followed,
 * the browser will send POST requests with the body PING to the URLs.
 * Typically for tracking.
 * @param param.referrerPolicy How much of the referrer to send when following the link.
 * @param param.rel The relationship of the linked URL as space-separated link types.
 * @param param.target Where to display the linked URL, as the name for a browsing context (a tab, window, or ``<iframe>``).
 * The following keywords have special meanings for where to load the URL
 * @param param.type Hints at the linked URL’s format with a MIME type. No built-in functionality.
 * @param param.charSet **deprecated** Hinted at the character encoding of the linked URL.
 * @param param.name **deprecated** Was required to define a possible target location in a page. In HTML 4.01,
 * id and name could both be used on ``<a>``, as long as they had identical values.
 * @param param.rev **deprecated** Specified a reverse link; the opposite of the rel attribute.
 * Deprecated for being very confusing.
 * @param param.shape **deprecated** The shape of the hyperlink’s region in an image map.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
 */
export default ({
     children,
     style,
     styleSheet,
     id,
     download,
     href,
     hrefLang,
     ping,
     referrerPolicy,
     rel,
     target,
     type,
     charSet,
     coords,
     name,
     rev,
     shape,
     className,
     events,
     renderIf = true,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "a",
          children: children,
          inlineStyle: style,
          props: {
               id,
               download,
               href,
               hrefLang,
               ping,
               referrerPolicy,
               rev,
               target,
               rel,
               type,
               charSet,
               coords,
               name,
               shape,
          },
          renderIf,
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
