import CreateComponent from "../CreateComponent.js";

const template = ({
     type,
     name,
     value,
     style,
     id,
     className,
     events,
     renderIf = true,
     min,
     max,
     placeholder,
     onCreated,
     onDestroyed,
     onUpdated,
     beforeCreated,
     beforeDestroyed,
     onRefreshed,
     styleSheet,
}) =>
     new CreateComponent({
          tag: "input",
          type: type,
          renderIf,
          name: name,
          value: value,
          inlineStyle: style,
          style: styleSheet,
          id: id,
          className: className,
          events: events,
          min: min,
          max: max,
          placeholder: placeholder,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
     });

export default {
     CheckBox: ({
          name,
          value,
          style,
          styleSheet,
          id,
          className,
          events,
          renderIf = true,
          min,
          max,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
     }) =>
          template({
               type: "checkbox",
               name: name,
               value: value,
               style: style,
               renderIf,
               styleSheet,
               id: id,
               className: className,
               events: events,
               min: min,
               max: max,
               onCreated,
               onDestroyed,
               onUpdated,
               beforeCreated,
               beforeDestroyed,
               onRefreshed,
          }),
     Date: ({
          name,
          value,
          renderIf = true,
          style,
          styleSheet,
          id,
          className,
          events,
          min,
          max,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
     }) =>
          template({
               type: "date",
               name: name,
               value: value,
               renderIf,
               style: style,
               styleSheet,
               id: id,
               className: className,
               events: events,
               min: min,
               max: max,
               onCreated,
               onDestroyed,
               onUpdated,
               beforeCreated,
               beforeDestroyed,
               onRefreshed,
          }),
     DateTimeLocal: ({
          name,
          value,
          style,
          styleSheet,
          renderIf = true,
          id,
          className,
          events,
          min,
          max,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
     }) =>
          template({
               type: "datetime-local",
               name: name,
               value: value,
               style: style,
               id: id,
               renderIf,
               className: className,
               events: events,
               min: min,
               max: max,
               styleSheet,
               onCreated,
               onDestroyed,
               onUpdated,
               beforeCreated,
               beforeDestroyed,
               onRefreshed,
          }),
     Email: ({
          name,
          value,
          style,
          styleSheet,
          id,
          className,
          events,
          min,
          max,
          renderIf = true,
          placeholder,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
     }) =>
          template({
               type: "email",
               name: name,
               value: value,
               style: style,
               renderIf,
               id: id,
               styleSheet,
               className: className,
               events: events,
               min: min,
               max: max,
               placeholder: placeholder,
               onCreated,
               onDestroyed,
               onUpdated,
               beforeCreated,
               beforeDestroyed,
               onRefreshed,
          }),
     File: ({
          name,
          value,
          style,
          renderIf = true,
          id,
          styleSheet,
          className,
          events,
          min,
          max,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
     }) =>
          template({
               type: "file",
               name: name,
               value: value,
               style: style,
               id: id,
               renderIf,
               className: className,
               events: events,
               min: min,
               max: max,
               styleSheet,
               onCreated,
               onDestroyed,
               onUpdated,
               beforeCreated,
               beforeDestroyed,
               onRefreshed,
          }),
     Image: ({
          name,
          value,
          styleSheet,
          style,
          id,
          renderIf = true,
          className,
          events,
          min,
          max,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
     }) =>
          template({
               type: "image",
               name: name,
               value: value,
               renderIf,
               styleSheet,
               style: style,
               id: id,
               className: className,
               events: events,
               min: min,
               max: max,
               onDestroyed,
               onUpdated,
               beforeCreated,
               beforeDestroyed,
               onCreated,
               onRefreshed,
          }),
     Month: ({
          name,
          value,
          style,
          id,
          renderIf = true,
          className,
          events,
          styleSheet,
          min,
          max,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
     }) =>
          template({
               type: "month",
               name: name,
               value: value,
               style: style,
               renderIf,
               styleSheet,
               id: id,
               className: className,
               events: events,
               min: min,
               max: max,
               onCreated,
               onDestroyed,
               onUpdated,
               beforeCreated,
               beforeDestroyed,
               onRefreshed,
          }),
     Number: ({
          name,
          value,
          style,
          id,
          className,
          events,
          min,
          styleSheet,
          max,
          renderIf = true,
          placeholder,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
     }) =>
          template({
               type: "number",
               name: name,
               value: value,
               renderIf,
               style: style,
               id: id,
               className: className,
               events: events,
               styleSheet,
               min: min,
               max: max,
               placeholder: placeholder,
               onDestroyed,
               onUpdated,
               beforeCreated,
               beforeDestroyed,
               onCreated,
               onRefreshed,
          }),
     Password: ({
          name,
          value,
          style,
          id,
          className,
          renderIf = true,
          events,
          styleSheet,
          min,
          max,
          placeholder,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
     }) =>
          template({
               type: "password",
               name: name,
               styleSheet,
               value: value,
               style: style,
               id: id,
               renderIf,
               className: className,
               events: events,
               min: min,
               max: max,
               placeholder: placeholder,
               onDestroyed,
               onUpdated,
               beforeCreated,
               beforeDestroyed,
               onCreated,
               onRefreshed,
          }),
     Radio: ({
          name,
          value,
          style,
          styleSheet,
          id,
          renderIf = true,
          className,
          events,
          min,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
     }) =>
          template({
               type: "radio",
               name: name,
               renderIf,
               value: value,
               styleSheet,
               style: style,
               id: id,
               className: className,
               events: events,
               min: min,
               max: max,
               onCreated,
               onDestroyed,
               onUpdated,
               beforeCreated,
               beforeDestroyed,
               onRefreshed,
          }),
     Range: ({
          name,
          value,
          style,
          styleSheet,
          id,
          className,
          events,
          renderIf = true,
          min,
          max,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
     }) =>
          template({
               type: "range",
               name: name,
               value: value,
               styleSheet,
               style: style,
               id: id,
               className: className,
               events: events,
               renderIf,
               min: min,
               max: max,
               onCreated,
               onDestroyed,
               onUpdated,
               beforeCreated,
               beforeDestroyed,
               onRefreshed,
          }),
     Text: ({
          name,
          value,
          style,
          renderIf = true,
          id,
          className,
          styleSheet,
          events,
          min,
          max,
          placeholder,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
     }) =>
          template({
               type: "text",
               name: name,
               value: value,
               style: style,
               id: id,
               renderIf,
               className: className,
               events: events,
               min: min,
               max: max,
               styleSheet,
               placeholder: placeholder,
               onCreated,
               onDestroyed,
               onUpdated,
               beforeCreated,
               beforeDestroyed,
               onRefreshed,
          }),
     Telephone: ({
          name,
          value,
          style,
          id,
          className,
          renderIf = true,
          events,
          styleSheet,
          min,
          max,
          placeholder,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
     }) =>
          template({
               type: "telephone",
               name: name,
               renderIf,
               value: value,
               style: style,
               id: id,
               className: className,
               events: events,
               styleSheet,
               min: min,
               max: max,
               placeholder: placeholder,
               onCreated,
               onDestroyed,
               onUpdated,
               beforeCreated,
               beforeDestroyed,
               onRefreshed,
          }),
     Time: ({
          name,
          value,
          style,
          renderIf = true,
          id,
          className,
          styleSheet,
          events,
          min,
          max,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
     }) =>
          template({
               type: "time",
               name: name,
               value: value,
               renderIf,
               style: style,
               id: id,
               className: className,
               events: events,
               styleSheet,
               min: min,
               max: max,
               onCreated,
               onDestroyed,
               onUpdated,
               beforeCreated,
               beforeDestroyed,
               onRefreshed,
          }),
     URL: ({
          name,
          value,
          style,
          id,
          className,
          renderIf = true,
          styleSheet,
          events,
          min,
          max,
          onCreated,
          onDestroyed,
          onUpdated,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
     }) =>
          template({
               type: "url",
               name: name,
               value: value,
               renderIf,
               style: style,
               id: id,
               className: className,
               events: events,
               styleSheet,
               min: min,
               max: max,
               onDestroyed,
               onUpdated,
               beforeCreated,
               beforeDestroyed,
               onCreated,
               onRefreshed,
          }),
     Week: ({
          name,
          value,
          style,
          id,
          styleSheet,
          className,
          events,
          min,
          max,
          onDestroyed,
          onUpdated,
          renderIf = true,
          beforeCreated,
          beforeDestroyed,
          onRefreshed,
     }) =>
          template({
               type: "week",
               name: name,
               value: value,
               style: style,
               id: id,
               styleSheet,
               className: className,
               events: events,
               min: min,
               max: max,
               onCreated,
               renderIf,
               onDestroyed,
               onUpdated,
               beforeCreated,
               beforeDestroyed,
               onRefreshed,
          }),
};
