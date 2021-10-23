import CreateComponent from "../../CreateComponent.js";

export default ({
     text,
     style,
     title,
     styleSheet,
     id,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          tag: "abbr",
          children: text,
          inlineStyle: style,
          renderIf,
          props: { title, id },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
