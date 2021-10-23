import CreateComponent from "../../CreateComponent.js";

export default ({
     text,
     style,
     styleSheet,
     id,
     direction,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          tag: "bdo",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { dir: direction, id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
