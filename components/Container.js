import CreateComponent from "../CreateComponent.js";

export default ({ children, style, id, className, events }) =>
     new CreateComponent({
          tag: "div",
          key: "0",
          children: children,
          inlineStyle: style,
          id: id,
          className: className,
          events: events,
     });
