import CreateComponent from "../../CreateComponent.js";

export default ({
     children,
     style,
     styleSheet,
     abbreviation,
     colSpan,
     headers,
     rowSpan,
     scope,
     id,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          children,
          tag: "th",
          inlineStyle: style,
          renderIf,
          props: { id, abbreviation, colSpan, headers, rowSpan, scope },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
