/**
 * Check if a given child is valid for processing.
 * @param {any} child
 * @returns {boolean}
 */
function checkChildIsValid(child) {
    if ([undefined, null, ""].includes(child)) return false;
    if (Array.isArray(child)) return false;

    return true;
}

function makeDiffList(oldList, newList) {
    const toRemove = {};
    const toUpdate = {};
    const toAdd = {};

    let combined = {};

    if (typeof oldList == "object" && !Array.isArray(oldList)) {
        combined = { ...combined, ...oldList };
    }

    if (typeof newList == "object" && !Array.isArray(newList)) {
        combined = { ...combined, ...newList };
    }

    for (let key in combined) {
        if (newList.hasOwnProperty(key)) {
            if (oldList.hasOwnProperty(key) && oldList[key] !== newList[key]) {
                toUpdate[key] = combined[key];
            } else {
                toAdd[key] = combined[key];
            }
        } else {
            toRemove[key] = combined[key];
        }
    }

    return { toRemove, toUpdate, toAdd };
}

module.exports = { checkChildIsValid, makeDiffList };
