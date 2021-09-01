import CreateComponent from "../CreateComponent.js";

const hn = ({ hn, text, id, style, events, className }) =>
     new CreateComponent({
          tag: hn,
          children: text,
          id: id,
          inlineStyle: style,
          events: events,
          className: className,
     });

export default {
     h1: ({ text, id, style, events, className }) =>
          hn({
               hn: "h1",
               text: text,
               id: id,
               style: style,
               events: events,
               className: className,
          }),
     h2: ({ text, id, style, events, className }) =>
          hn({
               hn: "h2",
               text: text,
               id: id,
               style: style,
               events: events,
               className: className,
          }),
     h3: ({ text, id, style, events, className }) =>
          hn({
               hn: "h3",
               text: text,
               id: id,
               style: style,
               events: events,
               className: className,
          }),
     h4: ({ text, id, style, events, className }) =>
          hn({
               hn: "h4",
               text: text,
               id: id,
               style: style,
               events: events,
               className: className,
          }),
     h5: ({ text, id, style, events, className }) =>
          hn({
               hn: "h5",
               text: text,
               id: id,
               style: style,
               events: events,
               className: className,
          }),
     h6: ({ text, id, style, events, className }) =>
          hn({
               hn: "h6",
               text: text,
               id: id,
               style: style,
               events: events,
               className: className,
          }),
};
