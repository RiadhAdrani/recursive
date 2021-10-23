import CreateComponent from "../../CreateComponent.js";

export default ({
     text,
     style,
     styleSheet,
     id,
     className,
     events,
     renderIf = true,
     hooks,
     noWrap,
}) =>
     new CreateComponent({
          tag: "dd",
          children: text,
          inlineStyle: style,
          props: { noWrap, id },
          renderIf,
          className,
          events,
          hooks,
          style: styleSheet,
     });
