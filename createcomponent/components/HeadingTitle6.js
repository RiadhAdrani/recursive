import CreateComponent from "../CreateComponent.js";

export default ({
     text,
     style,
     styleSheet,
     id,
     className,
     events,
     renderIf = true,
     onCreated,
     beforeDestroyed,
     onDestroyed,
     onUpdated,
}) =>
     new CreateComponent({
          tag: "h6",
          children: text,
          inlineStyle: style,
          id: id,
          renderIf,
          className: className,
          events: events,
          onCreated,
          onCreated,
          beforeDestroyed,
          onDestroyed,
          onUpdated,
          style: styleSheet,
     });
