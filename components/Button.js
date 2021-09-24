import CreateComponent from "../CreateComponent.js";

export default ({
     text,
     style,
     styleSheet,
     id,
     className,
     events,
     onCreated,
     onDestroyed,
     onUpdated,
     beforeCreated,
     beforeDestroyed,
     onRefreshed,
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
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
     });
