/**
 * Generate a unique Task identifier.
 * @param {bigint} time
 * @returns {string} uid
 */
function createTaskId(time) {
    let uuid = "";

    for (let i = 0; i < 5; i++) {
        uuid += Math.random() * i * 10 * Math.random();
    }

    return `task-${uuid}-${time}`;
}

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

module.exports = { createTaskId, createUpdateObject };
