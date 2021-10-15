import CreateComponent from "../CreateComponent.js";

export default ({
     text,
     className,
     id,
     style,
     events,
     styleSheet,
     onCreated,
     beforeDestroyed,
     onDestroyed,
     onUpdated,
     onStateUpdated,
}) =>
     new CreateComponent({
          tag: "p",
          children: text,
          id: id,
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
