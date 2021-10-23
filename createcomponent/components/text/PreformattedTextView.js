import CreateComponent from "../../CreateComponent.js";

export default ({
     children,
     style,
     styleSheet,
     id,
     className,
     events,
     renderIf = true,
     hooks,
     cols,
     width,
     wrap,
}) =>
     new CreateComponent({
          tag: "pre",
          children: children,
          inlineStyle: style,
          props: { id, cols, width, wrap },
          renderIf,
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
