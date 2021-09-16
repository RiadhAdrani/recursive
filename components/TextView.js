import CreateComponent from "../CreateComponent.js";

export default ({
     text,
     className,
     id,
     style,
     events,
     onCreated,
     onDestroyed,
     onUpdated,
     beforeCreated,
     beforeDestroyed,
}) =>
     new CreateComponent({
          tag: "p",
          children: text,
          id: id,
          inlineStyle: style,
          events: events,
          className: className,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
     });
