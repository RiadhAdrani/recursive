import CreateComponent from "../../CreateComponent.js";

export default ({
     children,
     style,
     styleSheet,
     id,
     colSpan,
     headers,
     rowSpan,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          children,
          tag: "td",
          inlineStyle: style,
          renderIf,
          props: { id, colSpan, headers, rowSpan },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
