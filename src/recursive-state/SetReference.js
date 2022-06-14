import SetStore from "./SetStore.js";

class ReferenceStore extends SetStore {
    static singleton = new ReferenceStore();

    clean() {
        for (let ref in this.items) {
            const obj = this.items[ref];
            if (!obj.exists) {
                this.removeItem(ref);
            } else {
                obj.exists = false;
            }
        }
    }

    getRef(uid) {
        if (!this.items[uid]) return document.createElement("div");

        return this.getItem(uid).el;
    }
}

/**
 * Retrieve the referred object by its ref name
 * @param {String} ref refernce name
 * @returns {HTMLElement} retrive an element with the given reference or an empty `<div>` if there is no match
 */
function getRef(ref) {
    return ReferenceStore.singleton.getRef(ref);
}

function setRef(ref, el) {
    ReferenceStore.singleton.setItem(ref, { ref, el, exists: true });
}

function cleanStore() {
    return ReferenceStore.singleton.clean();
}

function clearStore() {
    ReferenceStore.singleton.items = {};
}

export { getRef, setRef, cleanStore, clearStore };
