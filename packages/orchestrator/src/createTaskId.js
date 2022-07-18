/**
 * Generate a unique Task identifer.
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

export default createTaskId;
