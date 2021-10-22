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
     onStateUpdated,
}) =>
     new CreateComponent({
          tag: "button",
          children: text,
          renderIf,
          inlineStyle: style,
          style: styleSheet,
          id: id,
          className: className,
          events: events,
          onCreated,
          beforeDestroyed,
          onDestroyed,
          onUpdated,
          onStateUpdated,
     });
