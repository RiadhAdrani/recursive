import PropList from "./PropList.js";

export default {
     /**
      * Handle events related to the global window object
      * @param {JSON} events
      */
     events: function (events) {
          for (let e in events) {
               if (PropList.Events[e]) {
                    window.addEventListener(PropList.Events[e], () => {
                         vDOM.events[e]();
                    });
               }
          }
     },
};
