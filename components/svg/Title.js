import { CreateSvgComponent } from "../../index.js";

export default (props) => {
    return new CreateSvgComponent({
        ...props,
        tag: "title",
    });
};
