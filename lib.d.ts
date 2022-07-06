export interface Flags {
    renderIf: boolean;
    forceRerender: boolean;
}

export interface Hooks {
    onCreated: (el: any) => void;
    onUpdated: (el: any) => void;
    onRef: (el: any) => void;
    beforeDestroyed: (el: any) => void;
    onDestroyed: (el: any) => void;
}

export interface RawElement {
    elementType: string;
    instance: any;
    key: string;
    flags: Flags;
    hooks: Hooks;
    rendererOptions: { [item: string]: any };
    children: Array<any>;
    [item: string]: any;
}

export interface RecursiveElement extends RawElement {
    style: { [item: string]: any };
    attributes: { [item: string]: any };
    events: { [item: string]: any };
    map: { [item: string]: any };
}

export type App = () => RawElement;

export interface Route {
    path: string;
    redirectTo: string;
    title: string;
    routes: Array<Route>;
    component: App;
    onLoad: () => void;
    onExit: () => void;
}

export interface FlatRoutes {
    [key: string]: Route;
}
