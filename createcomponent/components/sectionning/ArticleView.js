import CreateComponent from "../../CreateComponent.js";

/**
 * ## ArticleView `<article>`
 * *from MDN Docs*
 * ### The Article Contents element
 * The `article` HTML element represents a self-contained composition in a document, page, application, or site, which is intended to be independently distributable or reusable (e.g., in syndication). Examples include: a forum post, a magazine or newspaper article, or a blog entry, a product card, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article
 */
export default ({
     children,
     style,
     styleSheet,
     id,
     className,
     events,
     renderIf = true,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "article",
          children: children,
          inlineStyle: style,
          props: { id },
          renderIf,
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
