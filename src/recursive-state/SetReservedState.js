import {
    batchCallback,
    notifyStateChanged,
} from "../recursive-orchestrator/RecursiveOrchestrator.js";
import SetStore from "./SetStore.js";

class SetReservedState extends SetStore {
    static singleton = new SetReservedState();

    constructor() {
        super();
    }

    changeItem(key, newVal) {
        if (this.getItem(key) === newVal) return;

        batchCallback(() => {
            notifyStateChanged();
            this.setItem(key, newVal);
        }, "update-reserved-state-" + Date.now());
    }

    itemExists(key) {
        return this.items[key] !== undefined;
    }

    retreiveItem(key) {
        if (!this.itemExists(key)) return [undefined, () => {}];

        return [this.getItem(key), (newVal) => this.changeItem(key, newVal)];
    }
}

function setState(key, newVal) {
    SetReservedState.singleton.setItem(key, newVal);

    return SetReservedState.singleton.retreiveItem(key);
}

function getState(key) {
    return SetReservedState.singleton.retreiveItem(key);
}

export { setState, getState };
