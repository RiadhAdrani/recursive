import CreateComponent from "../CreateComponent.js";

export default ({
     children,
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
          tag: "option",
          children: children,
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
          onStateUpdated,
          style: styleSheet,
     });
