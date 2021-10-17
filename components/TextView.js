import CreateComponent from "../CreateComponent.js";

export default ({
     text,
     className,
     id,
     style,
     events,
     styleSheet,
     onCreated,
     renderIf = true,
     beforeDestroyed,
     onDestroyed,
     onUpdated,
     onStateUpdated,
}) =>
     new CreateComponent({
          tag: "p",
          children: text,
          id: id,
          renderIf,
          inlineStyle: style,
          style: styleSheet,
          events: events,
          className: className,
          onCreated,
          beforeDestroyed,
          onDestroyed,
          onUpdated,
          onStateUpdated,
     });
