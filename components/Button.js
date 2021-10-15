import CreateComponent from "../CreateComponent.js";

export default ({
     text,
     style,
     styleSheet,
     id,
     className,
     events,
     onCreated,
     beforeDestroyed,
     onDestroyed,
     onUpdated,
     onStateUpdated,
}) =>
     new CreateComponent({
          tag: "button",
          children: text,
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
