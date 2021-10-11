import CreateComponent from "../CreateComponent.js";

export default ({
     text,
     className,
     id,
     style,
     events,
     styleSheet,
     onCreated,
     onDestroyed,
     onUpdated,
     beforeDestroyed,
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
          onDestroyed,
          onUpdated,
          beforeDestroyed,
     });
