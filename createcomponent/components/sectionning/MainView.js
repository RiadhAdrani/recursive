import CreateComponent from "../../CreateComponent.js";

/**
 * ## MainView `<main>`
 * *from MDN Docs*
 *
 * The ``<main>`` HTML element represents the dominant content of the <body> of a document. The main content area consists of content that is directly related to or expands upon the central topic of a document, or the central functionality of an application.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main
 */
export default ({
     children,
     style,
     styleSheet,
     id,
     className,
     events,
     renderIf = true,
     flags,
     hooks,
}) =>
     new CreateComponent({
          tag: "main",
          children,
          inlineStyle: style,
          props: { id },
          renderIf,
          className,
          events,
          hooks,
          style: styleSheet,
          flags,
     });
