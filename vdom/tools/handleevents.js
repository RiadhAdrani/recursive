import PropList from "../PropList.js";

export default (events) => {
     for (let e in events) {
          if (PropList.Events[e]) {
               window.addEventListener(PropList.Events[e], () => {
                    vDOM.events[e]();
               });
          }
     }
};
