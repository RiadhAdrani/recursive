import CreateComponent from "../CreateComponent.js";

export default ({ text, className, id, style, events, onCreated }) =>
     new CreateComponent({
          tag: "p",
          children: text,
          id: id,
          inlineStyle: style,
          events: events,
          className: className,
          onCreated,
     });
