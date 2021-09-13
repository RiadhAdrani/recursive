import CreateComponent from "../CreateComponent.js";

export default ({ text, style, id, className, events, onCreated }) =>
     new CreateComponent({
          tag: "button",
          children: text,
          inlineStyle: style,
          id: id,
          className: className,
          events: events,
          onCreated,
     });
