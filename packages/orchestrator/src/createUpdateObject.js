/**
 * Create an update object.
 * @param {string} sender - sender codename
 * @param {string} uuid - sender id
 * @returns
 */
function createUpdateObject(sender, uuid) {
    const object = {
        sender,
        time: Date.now(),
        uuid,
    };

    return object;
}

module.exports = createUpdateObject;
