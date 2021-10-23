import CreateComponent from "../../CreateComponent.js";

export default ({
     style,
     styleSheet,
     id,
     height,
     src,
     type,
     width,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          tag: "embed",
          inlineStyle: style,
          renderIf,
          props: { id, height, src, type, width },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
