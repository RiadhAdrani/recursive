import { CreateComponent, Props } from "../../View";

/**
 * @param {Props} props
 */
export default (props) => {
    return new CreateComponent({
        ...props,
        tag: "tbody",
    });
};
