import CreateComponent from "../../CreateComponent.js";

export default ({
     style,
     styleSheet,
     id,
     media,
     sizes,
     src,
     srcSet,
     type,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          tag: "source",
          inlineStyle: style,
          renderIf,
          props: { id, media, sizes, src, srcSet, type },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
