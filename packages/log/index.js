/**
 *
 */
class ConsoleLogger {
    static singleton = new ConsoleLogger();

    constructor() {
        this.options = {};
    }

    setOption(name, value) {
        if (!this.options[name]) this.options[name] = false;

        this.options[name] = value;
    }

    log(name, callback) {
        if (!this.options[name]) return;
        if (typeof callback !== "function") return;

        callback();
    }
}

function renderTime() {
    ConsoleLogger.singleton.log("render", () => {
        console.time("Render");
    });
}

function renderTimeEnd() {
    ConsoleLogger.singleton.log("render", () => {
        console.timeEnd("Render");
    });
}

function updateTime() {
    ConsoleLogger.singleton.log("update", () => {
        console.time("Updated");
    });
}

function updateTimeEnd() {
    ConsoleLogger.singleton.log("update", () => {
        console.timeEnd("Updated");
    });
}

function devLogs(options = { render: false, update: false }) {
    ConsoleLogger.singleton.options = options;
}

export { devLogs, renderTime, renderTimeEnd, updateTime, updateTimeEnd };
