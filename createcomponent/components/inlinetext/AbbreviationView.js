import CreateComponent from "../../CreateComponent.js";

/**
 * ## AbbreviationView `<abbr>`
 * *from MDN Docs*
 * ### The Abbreviation element
 * The ``<abbr>`` HTML element represents an abbreviation or acronym;
 * the optional title attribute can provide an expansion or description for the abbreviation.
 * If present, title must contain this full description and nothing else.
 * @param param.title contain a full human-readable description or expansion of the abbreviation
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr
 */
export default ({
     text,
     style,
     title,
     styleSheet,
     id,
     className,
     events,
     renderIf = true,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "abbr",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { title, id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
