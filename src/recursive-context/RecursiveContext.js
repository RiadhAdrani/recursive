class RecursiveContext {
    static singleton = new RecursiveContext();

    constructor() {
        this.context = undefined;
        this.stack = [];
    }

    startContext(newContext) {
        if (this.context) {
            this.stack.push(this.context);
        }
        this.context = newContext;
    }

    endCurrentContext() {
        if (this.context) {
            if (this.stack.length > 0) this.context = this.stack.pop();
            else this.context = undefined;
        }
    }
}

function startContext(newContext) {
    RecursiveContext.singleton.startContext(newContext);
}

function endCurrentContext() {
    RecursiveContext.singleton.endCurrentContext();
}

function getContext() {
    return RecursiveContext.singleton.context;
}

function makeContext(newContext, callback) {
    if (callback === undefined || typeof callback !== "function") return;

    RecursiveContext.singleton.startContext(newContext);

    callback();

    RecursiveContext.singleton.endCurrentContext();
}

export { startContext, endCurrentContext, getContext, makeContext };
