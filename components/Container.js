import CreateComponent from "../CreateComponent.js";

export default ({
     children,
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
          tag: "div",
          key: "0",
          children: children,
          inlineStyle: style,
          id: id,
          className: className,
          events: events,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
          style: styleSheet,
     });
