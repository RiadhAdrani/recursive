import CreateComponent from "../../CreateComponent.js";

export default ({
     text,
     style,
     styleSheet,
     id,
     isFor,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          children: text,
          tag: "label",
          inlineStyle: style,
          renderIf,
          props: { id, isFor },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
