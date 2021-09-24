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
     onDestroyed,
     onUpdated,
     beforeCreated,
     beforeDestroyed,
     onRefreshed,
}) =>
     new CreateComponent({
          tag: "img",
          src: src,
          inlineStyle: style,
          style: styleSheet,
          id: id,
          children: null,
          className: className,
          events: events,
          alt: alt,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
     });
