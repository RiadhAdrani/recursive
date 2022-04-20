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
        history.pushState({ route }, title, this.makeURL(path));
    }

    replaceState(route, title, path) {
        history.replaceState({ route }, title, this.makeURL(path));
    }

    makeURL(path) {
        let url = `${location.origin}/`;

        if (getRoot().trim()) {
            url += `${getRoot()}/`;
        }

        if (path[0] == "/") {
            url += path.slice(1);
        } else {
            url += path;
        }

        return url;
    }
}

const pushState = (route, title, path) => RecursiveHistory.singleton.pushState(route, title, path);

const replaceState = (route, title, path) =>
    RecursiveHistory.singleton.replaceState(route, title, path);

const makeURL = (path) => RecursiveHistory.singleton.makeURL(path);

export { pushState, replaceState, makeURL };
