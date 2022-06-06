import { Render } from "../../index.js";
import CreateComponent from "../create-component/CreateComponent.js";
import { setState } from "../recursive-state/SetState.js";

Render(() => {
    const [value, setValue] = setState("value", "first value");

    return new CreateComponent({
        tag: "input",
        props: { id: "test", maxLength: 20, value },
        data: { value },
        events: { onInput: (e) => setValue(e.target.value) },
    });
});
