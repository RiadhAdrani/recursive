import CreateComponent from "../../CreateComponent.js";

export default ({
     style,
     styleSheet,
     id,
     defaultTrack,
     kind,
     label,
     src,
     srcLang,
     className,
     events,
     renderIf = true,
     hooks,
}) =>
     new CreateComponent({
          tag: "track",
          inlineStyle: style,
          renderIf,
          props: { id, kind, label, src, srcLang, default: defaultTrack },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
     });
