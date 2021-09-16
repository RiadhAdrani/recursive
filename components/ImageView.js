import CreateComponent from "../CreateComponent.js";

export default ({
     imageURL,
     style,
     id,
     className,
     events,
     alt,
     onCreated,
     onDestroyed,
     onUpdated,
     beforeCreated,
     beforeDestroyed,
}) =>
     new CreateComponent({
          tag: "img",
          src: imageURL,
          inlineStyle: style,
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
     });
