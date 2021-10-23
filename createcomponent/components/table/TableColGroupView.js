import CreateComponent from "../../CreateComponent.js";

export default ({
     children,
     style,
     styleSheet,
     id,
     span,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          children,
          tag: "colgroup",
          inlineStyle: style,
          renderIf,
          props: { id, span },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
