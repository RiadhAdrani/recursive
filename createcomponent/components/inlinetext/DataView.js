import CreateComponent from "../../CreateComponent.js";

export default ({
     text,
     style,
     styleSheet,
     value,
     id,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          tag: "data",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { id, value },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
