import CreateComponent from "../CreateComponent.js";

export default ({ imageURL, style, id, className, events, alt, onCreated }) =>
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
     });
