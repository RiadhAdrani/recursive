import { getRoot } from "./RecursiveRouter";

class RecursiveHistory {
     static singleton = new RecursiveHistory();

     constructor() {
          if (RecursiveHistory.singleton instanceof RecursiveHistory) {
               throwError("RecursiveHistory cannot have more than one instance", [
                    "RecursiveHistory is an internal class and should not be used in development.",
               ]);
          }
     }

     pushState(route, title, path) {
          history.pushState({ route }, title, `${location.origin}/${getRoot()}${path}`);
     }

     replaceState(route, title, path) {
          history.replaceState({ route }, title, `${location.origin}/${getRoot()}${path}`);
     }
}

const pushState = (route, title, path) => RecursiveHistory.singleton.pushState(route, title, path);

const replaceState = (route, title, path) =>
     RecursiveHistory.singleton.replaceState(route, title, path);

export { pushState, replaceState };
