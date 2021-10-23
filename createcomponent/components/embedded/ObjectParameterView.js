import CreateComponent from "../../CreateComponent.js";

export default ({
     style,
     styleSheet,
     id,
     name,
     value,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          tag: "param",
          inlineStyle: style,
          renderIf,
          props: { id, name, value },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
