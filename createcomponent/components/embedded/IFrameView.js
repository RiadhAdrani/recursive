import CreateComponent from "../../CreateComponent.js";

/**
 * ## IFrameView `<iframe>`
 * *from MDN Docs*
 * ### The Inline Frame element
 * The ``<embed>`` HTML element embeds external content at the specified point in the document.
 * This content is provided by an external application or other source of interactive
 * content such as a browser plug-in.
 * @param param.height The displayed height of the resource in pixel
 * @param param.name A targetable name for the embedded browsing context.
 * @param param.referrerPolicy Indicates which referrer to send when fetching the frame's resource
 * @param param.sandbox Applies extra restrictions to the content in the frame.
 * @param param.src The URL of the page to embed.
 * @param srcDoc Inline HTML to embed, overriding the src attribute
 * @param param.width The displayed width of the resource in pixel
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
 */
export default ({
     children,
     style,
     styleSheet,
     id,
     allow,
     allowFullScreen,
     allowPaymentRequest,
     height,
     loading,
     name,
     referrerPolicy,
     sandbox,
     src,
     srcDoc,
     width,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children,
          tag: "iframe",
          inlineStyle: style,
          props: {
               id,
               allow,
               allowFullScreen,
               allowPaymentRequest,
               height,
               loading,
               name,
               referrerPolicy,
               sandbox,
               src,
               srcDoc,
               width,
          },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
