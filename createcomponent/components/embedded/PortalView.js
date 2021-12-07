import CreateComponent from "../../CreateComponent.js";

/**
 * ## PortalView `<portal>`
 * *from MDN Docs*
 * ### The Portal element
 * The ``<portal>`` HTML element enables the embedding of another HTML page into the current one for the purposes
 * of allowing smoother navigation into new pages.
 * @param param.referrerPolicy Sets the referrer policy to use when requesting the page at the URL given as the value of the src attribute.
 * @param param.src The URL of the page to embed.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/portal
 */
export default ({ style, styleSheet, id, referrerPolicy, src, className, events, hooks, flags }) =>
     new CreateComponent({
          tag: "portal",
          inlineStyle: style,
          props: { id, referrerPolicy, src },
          className: className,
          events: events,
          hooks,
          flags,
          style: styleSheet,
     });
