class SetStore {
    constructor() {
        this.items = {};
    }

    static singleton = new SetStore();

    removeItem(key) {
        delete this.items[key];
    }

    setItem(key, data) {
        let firstTime = false;

        if (!this.items[key]) firstTime = true;

        this.items[key] = { data };
    }

    changeItem(key, newData) {
        this.items[key].data = newData;
    }

    getItem(key, defaultValue) {
        if (this.items[key]) return this.items[key].data;
        else defaultValue;
    }
}

export default SetStore;
