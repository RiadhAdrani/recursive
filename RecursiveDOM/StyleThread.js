import HandleStyle from "./HandleStyle.js";

// listen for data from the main window
self.addEventListener("message", (e) => {
     // store style data
     const input = {
          selectors: e.data.selectors,
          animations: e.data.animations,
          mediaQueries: e.data.media,
          old: e.data.old,
          mode: e.data.devMode,
          iteration: e.data.iteration,
     };

     // generate style
     const data = HandleStyle.export(
          input.selectors,
          input.animations,
          input.mediaQueries,
          input.old
     );

     // send generated style to the main window
     self.postMessage({ didchange: data !== input.old, text: data, iteration: input.iteration });
});
