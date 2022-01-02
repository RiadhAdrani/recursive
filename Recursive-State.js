import SetState from "./RecursiveDOM/SetState.js";

const setState = (value) => new SetState(value);
const updateAfter = (actions) => SetState.updateAfter(actions);

export { setState, updateAfter };
