import CreateComponent from "../CreateComponent.js";

const hn = ({ hn, text, id, style, events, className, onCreated }) =>
     new CreateComponent({
          tag: hn,
          children: text,
          id: id,
          inlineStyle: style,
          events: events,
          className: className,
          onCreated,
     });

export default {
     h1: ({ text, id, style, events, className, onCreated }) =>
          hn({
               hn: "h1",
               text: text,
               id: id,
               style: style,
               events: events,
               className: className,
               onCreated,
          }),
     h2: ({ text, id, style, events, className, onCreated }) =>
          hn({
               hn: "h2",
               text: text,
               id: id,
               style: style,
               events: events,
               className: className,
               onCreated,
          }),
     h3: ({ text, id, style, events, className, onCreated }) =>
          hn({
               hn: "h3",
               text: text,
               id: id,
               style: style,
               events: events,
               className: className,

               onCreated,
          }),
     h4: ({ text, id, style, events, className }) =>
          hn({
               hn: "h4",
               text: text,
               id: id,
               style: style,
               events: events,
               className: className,
               onCreated,
          }),
     h5: ({ text, id, style, events, className, onCreated }) =>
          hn({
               hn: "h5",
               text: text,
               id: id,
               style: style,
               events: events,
               className: className,
               onCreated,
          }),
     h6: ({ text, id, style, events, className, onCreated }) =>
          hn({
               hn: "h6",
               text: text,
               id: id,
               style: style,
               events: events,
               className: className,
               onCreated,
          }),
};
