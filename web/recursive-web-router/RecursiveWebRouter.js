import RecursiveRouter from "../../core/recursive-router/RecursiveRouter";
import RouteType from "../../core/recursive-router/RouteType";

class RecursiveWebRouter extends RecursiveRouter {
    constructor(route, base, scroll, manager, orchestrator) {
        super(route, base, scroll, manager, orchestrator);
    }

    static singleton = undefined;

    /**
     * Add a `popstate` event listener to the window.
     */
    useRouterNavigationListener() {
        window.addEventListener("popstate", (e) => {
            let _route;

            if (e.state) {
                _route = e.state.route;
            } else {
                const [template] = this.stateManager.getReserved("route");

                _route = template;
            }

            const _to = this.useRouterGetRoute();

            const _template = this.routes[_route] ? this.routes[_route] : this.routes["/404"];

            this.loadRoute(_template, _to);

            e.preventDefault();
        });
    }

    /**
     * Create a url from the given path.
     * @param {string} path
     * @returns {string}
     */
    useRouterMakeURL(path) {
        let url = `${location.origin}/`;

        if (this.base.trim()) {
            url += `${this.base}/`;
        }

        if (path.charAt(0) == "/") {
            url += path.slice(1);
        } else {
            url += path;
        }

        return url;
    }

    /**
     * Retreive the current location.
     * @returns {string}
     */
    useRouterGetRoute() {
        return this.base
            ? window.location.pathname.replace("/" + this.base, "")
            : window.location.pathname;
    }

    /**
     * Retrieve the current location pathname.
     * @returns
     */
    useRouterGetLocationPath() {
        return location.pathname;
    }

    /**
     * Replace the current history state with another one.
     * @param {any} template
     * @param {string} hash
     */
    useRouterReplaceState(template, hash) {
        history.replaceState(
            { route: template.route.path },
            "",
            this.useRouterMakeURL(`${template.path}${hash}`)
        );
    }

    /**
     * Push another history state to the stack.
     * @param {any} template
     */
    useRouterPushState(template) {
        history.pushState({ route: template.route.path }, "", this.useRouterMakeURL(template.path));
    }

    /**
     * Scroll into the anchor view if it exists.
     * @param {string} anchor
     */
    useRouterGoToAnchor(anchor) {
        const target = document.getElementById(anchor.replace("#", ""));

        if (target) {
            target.scrollIntoView();
        }
    }

    /**
     * Scroll to the top of the window.
     */
    useRouterScrollToTop() {
        if (this.scroll) window.scrollTo({ top: 0, behavior: "smooth" });
    }

    /**
     * Execute when the app has loaded.
     * @returns
     */
    useRouterOnLoad() {
        const route = this.useRouterGetRoute();
        const hash = location.hash;

        if (route === "/") return;

        this.replace(route, hash);
    }
}

function check(callback) {
    if (typeof callback !== "function") return;
    if (RecursiveWebRouter.singleton === undefined) return;

    return callback(RecursiveWebRouter.singleton);
}

/**
 * Create a new `WebRouter`
 * @param {typeof RouteType} route root route
 * @param {string} base base of the url
 * @param {boolean} scroll scroll when a new route is loaded
 */
function createRouter(route, base, scroll) {
    RecursiveWebRouter.singleton = new RecursiveWebRouter(route, base, scroll);
}

/**
 *
 * @param param
 * @param {string} param.path route path
 * @returns
 */
function route({ path, component, title, routes, redirectTo }) {
    return { path, component, title, routes, redirectTo };
}

/**
 * Return the current route url path.
 * @returns
 */
function getRoute() {
    return check((router) => router.useRouterGetRoute());
}

/**
 * Return an object containing keyed values.
 * @returns
 */
function getParams() {
    return check((router) => router.getParams());
}

/**
 * Return the base of the router.
 * @returns {string} base
 */
function getBase() {
    return check((router) => router.base);
}

/**
 * Redirect the app to the provided path.
 * @param {string} path
 * @returns
 */
function goTo(path) {
    return check((router) => router.goTo(path));
}

/**
 * Return the appropriate component
 * @returns {any} component
 */
function renderRoute() {
    return check((router) => router.renderRoute());
}

/**
 * Execute when the app has been initialized.
 * @returns
 */
function onAppLoaded() {
    return check((router) => router.useRouterOnLoad());
}

export default RecursiveWebRouter;
