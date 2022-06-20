import { CreateSvgComponent, Props } from "../View";

/**
 * @param {Props} props
 */
export default (props) => {
    return new CreateSvgComponent({
        ...props,
        tag: "feFuncG",
    });
};
