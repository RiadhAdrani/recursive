import CreateComponent from "../../CreateComponent.js";

export default ({
     style,
     styleSheet,
     id,
     className,
     data,
     form,
     height,
     name,
     type,
     useMap,
     width,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          tag: "object",
          inlineStyle: style,
          renderIf,
          props: { id, data, form, height, name, type, useMap, width },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
