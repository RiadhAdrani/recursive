import CreateComponent from "../../CreateComponent.js";

export default ({
     style,
     styleSheet,
     id,
     className,
     events,
     renderIf = true,
     align,
     color,
     noShade,
     size,
     width,
     hooks,
}) =>
     new CreateComponent({
          tag: "hr",
          inlineStyle: style,
          id: id,
          renderIf,
          className: className,
          props: { align, color, noShade, size, width, id },
          events: events,
          hooks,
          style: styleSheet,
     });
