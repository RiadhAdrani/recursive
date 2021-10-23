import CreateComponent from "../../CreateComponent.js";

export default ({
     style,
     styleSheet,
     id,
     className,
     value,
     min,
     max,
     low,
     high,
     optimum,
     form,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          tag: "meter",
          inlineStyle: style,
          renderIf,
          props: { id, value, min, max, low, high, optimum, form },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
