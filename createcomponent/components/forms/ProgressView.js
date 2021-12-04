import CreateComponent from "../../CreateComponent.js";

/**
 * ## ProgressView `<progress>`
 * *from MDN Docs*
 * ### The Progress Indicator element
 * The ``<progress>`` HTML element displays an indicator showing the completion progress of a task,
 * typically displayed as a progress bar.
 * @param param.max This attribute describes how much work the task indicated by the progress element requires.
 * @param param.value This attribute specifies how much of the task that has been completed.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
 */
export default ({
     text,
     style,
     styleSheet,
     id,
     className,
     max,
     value,
     events,
     renderIf = true,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children: text,
          tag: "progress",
          inlineStyle: style,
          renderIf,
          props: { id, max, value },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
