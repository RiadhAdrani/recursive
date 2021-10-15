import CreateComponent from "../CreateComponent.js";

export default ({
     src,
     style,
     styleSheet,
     id,
     className,
     events,
     alt,
     onCreated,
     beforeDestroyed,
     onDestroyed,
     onUpdated,
     onStateUpdated,
}) =>
     new CreateComponent({
          tag: "img",
          src: src,
          inlineStyle: style,
          style: styleSheet,
          id: id,
          children: [],
          className: className,
          events: events,
          alt: alt,
          onCreated,
          beforeDestroyed,
          onDestroyed,
          onUpdated,
          onStateUpdated,
     });
