import CreateComponent from "../../CreateComponent.js";

export default ({
     text,
     style,
     styleSheet,
     id,
     title,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          tag: "dfn",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { id, title },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
