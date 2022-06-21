import { Input } from "../../components/html.js";
import { Link } from "../../components/utility.js";
import { Circle, Svg, Text } from "../../components/vector.js";
import {
    Render,
    CreateComponent,
    setState,
    setCache,
    getRef,
    createRouter,
    route,
    renderRoute,
    getParams,
} from "../../index.js";
import { devLogs } from "../../core/recursive-logger/ConsoleLogger.js";

devLogs({ render: true, update: true });

const Button = ({ children, onClick }) => new CreateComponent({ tag: "button", children, onClick });

const Home = () => {
    const [value, setvalue] = setState("value", [1, 2, 3, 4, 5, 6, 7, 8, 9]);

    return new CreateComponent({
        tag: "div",
        children: [
            ...value.map((number) =>
                Button({
                    children: "state " + number,
                    onClick: () => {
                        setTimeout(() => setvalue(value.filter((x) => x != number)), 500);
                    },
                })
            ),
        ],
    });
};

const SetCache = () => {
    const [value, setvalue] = setCache("value", [1, 2, 3, 4, 5, 6, 7, 8, 9]);

    return new CreateComponent({
        tag: "div",
        children: [
            ...value.map((number) =>
                Button({
                    children: "cached " + number,
                    onClick: () => {
                        setvalue(value.filter((x) => x != number));
                    },
                })
            ),
        ],
    });
};

const GetRef = () => {
    return new CreateComponent({
        hooks: { onRef: () => "container" },
        tag: "div",
        children: Button({
            children: "Log route",
            onClick: () => {
                console.log(getRef("container"));
            },
        }),
    });
};

const Nested = () => {
    return new CreateComponent({
        tag: "div",
        children: Button({
            children: getParams().route,
        }),
    });
};

createRouter(
    route({
        name: "/",
        component: Home,
        subRoutes: [
            route({ name: "/cache", component: SetCache }),
            route({ name: "/ref", component: GetRef }),
            route({
                name: "/nested",
                component: () => renderRoute(),
                subRoutes: [route({ name: "/route=:route;", component: Nested })],
            }),
        ],
    }),
    "dev"
);

Render(() => {
    return new CreateComponent({
        tag: "div",
        style: { inline: { display: "flex", flexDirection: "column" } },
        children: [
            new CreateComponent({
                tag: "div",
                style: { inline: { display: "flex", flexDirection: "row" } },
                children: [
                    Link({ children: "home", href: "/" }),
                    Link({ children: "set cache", href: "/cache" }),
                    Link({ children: "get ref", href: "/ref" }),
                    Link({ children: "nested", href: "/nested/route=:nested;" }),
                    Link({ children: "cringez", href: "/nested/route=:cringe;" }),
                ],
            }),
            renderRoute(),
        ],
    });
});
