import CreateComponent from "../CreateComponent.js";

export default ({ imageURL, style, id, className, events, alt }) =>
     new CreateComponent({
          tag: "img",
          src: imageURL,
          inlineStyle: style,
          id: id,
          className: className,
          events: events,
          alt: alt,
     });
