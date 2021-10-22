import AbstractedComponent from "../AbstractedComponent.js";

export default ({
     className,
     style,
     value,
     type,
     placeholder,
     renderIf,
     hooks = {
          onCreated: null,
          beforeDestroyed: null,
          onDestroyed: null,
          onUpdated: null,
          onStateUpdated: null,
     },
     events = {},
}) => {
     return new AbstractedComponent({
          tag: "input",
          props: { className: className, type, value, renderIf, placeholder },
          events: events,
          hooks: hooks,
          style: style,
     });
};
