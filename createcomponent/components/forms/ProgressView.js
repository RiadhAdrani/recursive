import CreateComponent from "../../CreateComponent.js";

export default ({
     text,
     style,
     styleSheet,
     id,
     className,
     max,
     value,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          children: text,
          tag: "progress",
          inlineStyle: style,
          renderIf,
          props: { id, max, value },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
