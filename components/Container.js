import CreateComponent from "../CreateComponent.js";

export default ({
     children,
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
          tag: "div",
          children: children,
          inlineStyle: style,
          id: id,
          className: className,
          events: events,
          onCreated,
          onCreated,
          beforeDestroyed,
          onDestroyed,
          onUpdated,
          onStateUpdated,
          style: styleSheet,
     });
