import CreateComponent from "../../CreateComponent.js";

export default ({
     text,
     style,
     styleSheet,
     id,
     isFor,
     form,
     name,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          children: text,
          tag: "optgroup",
          inlineStyle: style,
          renderIf,
          props: { id, isFor, form, name },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
