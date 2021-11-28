import list from "../props/events.js";

export default (events) => {
     for (let e in events) {
          if (list[e]) {
               window.addEventListener(list[e], () => {
                    vDOM.events[e]();
               });
          }
     }
};
