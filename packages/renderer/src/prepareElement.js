const { RecursiveRenderer } = require("../");
const { isFlag } = require("../flags");
const { isHook } = require("../hooks");
const { RecursiveConsole } = require("../../console");
const {
    ELEMENT_TYPE_FRAGMENT,
    ELEMENT_TYPE_TEXT_NODE,
    RECURSIVE_ELEMENT_SYMBOL,
    ELEMENT_TYPE_RAW,
} = require("../../constants");
const { checkChildIsValid } = require("../utility");

/**
 * Return a verified tree to be used in rendering or updating
 * @param {import("../../../lib.js").RawElement} element
 * @param {string} id
 * @param {import("../../../lib.js").RecursiveElement} parent
 * @param {RecursiveRenderer} renderer
 * @return {import("../../../lib.js").RecursiveElement} tree
 */
const prepareElement = (element, id, parent, renderer) => {
    const _element = {};

    if (!element.$$_RecursiveSymbol || element.$$_RecursiveSymbol != RECURSIVE_ELEMENT_SYMBOL) {
        RecursiveConsole.error(
            "Recursive Renderer : Element does not have the RecursiveElement signature symbol.",
            ['You should create an element only using "createRecursiveElement" method.']
        );
        return false;
    }

    if (
        typeof element.elementType != "string" ||
        !element.elementType ||
        !element.elementType.toString().trim()
    ) {
        RecursiveConsole.error('Recursive Renderer : "elementType" should not be empty or null.', [
            "Element type should be of type string.",
            "Make sure to provide a type for your element (ex: div in web).",
        ]);
        return false;
    }

    _element.$$_RecursiveSymbol = element.$$_RecursiveSymbol;
    _element.elementType = element.elementType;
    _element.events = {};
    _element.attributes = {};
    _element.children = [];
    _element.hooks = {};
    _element.flags = {};
    _element.instance = {};
    _element.style = {};
    _element.map = false;
    _element.key = element.key;
    _element.ref = undefined;
    _element.style = element.style;
    _element.rendererOptions = element.rendererOptions;
    _element.uid = id;
    _element.parent = parent;
    _element.indexInParent = parseInt(id.split("-").pop());

    for (let property in element) {
        if (property === "flags") {
            for (let flag in element.flags) {
                if (isFlag(flag)) {
                    _element.flags[flag] = element.flags[flag];
                }
            }
        }

        if (property === "hooks") {
            for (let hook in element.hooks) {
                if (isHook(hook, element.hooks[hook])) {
                    _element.hooks[hook] = element.hooks[hook];
                }
            }
        }

        if (renderer.useRendererIsEvent(property)) {
            if (typeof element[property] != "function") {
                RecursiveConsole.error(
                    `Recursive Renderer : Event "${property}" is not a function.`
                );
            }
            _element.events[property] = element[property];
            continue;
        }

        if (renderer.useRendererIsAttribute(property)) {
            _element.attributes[property] = element[property];
            continue;
        }
    }

    if (![null, undefined].includes(element.children)) {
        let _children = [];

        if (!Array.isArray(element.children)) {
            element.children = [element.children];
        }

        element.children.forEach((child, index) => {
            const uid = _element.uid + "-" + index;

            const _child = prepareChild(child, uid, _element, renderer);

            if (_child) {
                if (_child.elementType === ELEMENT_TYPE_FRAGMENT) {
                    _children.push(..._child.children);
                } else {
                    if (checkChildIsValid(_child)) {
                        _children.push(_child);
                    }
                }
            }
        });

        _element.children = _children;

        if (
            _element.elementType === ELEMENT_TYPE_RAW &&
            _element.children.some((child) => child.elementType != ELEMENT_TYPE_TEXT_NODE)
        ) {
            RecursiveConsole.warn(
                "Recursive Renderer : " +
                    "You are using the raw element while one or more children are not of type string." +
                    " They will be converted to string."
            );
        }

        _element.map = prepareMap(_element.children);
    }

    return _element;
};

/**
 * Return a verified element child
 * @param {import("../../../lib.js").BaseElement} child
 * @param {string} id
 * @param {RecursiveRenderer} renderer
 * @param {import("../../../lib.js").RecursiveElement}
 */
function prepareChild(child, id, parent, renderer) {
    if ([null, undefined].includes(child)) return false;

    if (!child.elementType) {
        // called without [createRecursiveElement] to avoid circular dependency with webpack.
        return {
            elementType: ELEMENT_TYPE_TEXT_NODE,
            $$_RecursiveSymbol: RECURSIVE_ELEMENT_SYMBOL,
            children: child,
            instance: undefined,
        };
    } else {
        if (child.flags && child.flags.renderIf === false) {
            return false;
        } else {
            let _prepared = false;

            _prepared = prepareElement(child, id, parent, renderer);

            return _prepared;
        }
    }
}

/**
 * Create a map with the given children or return false.
 * @param {Array<import("../../../lib.js").BaseElement>} children
 */
function prepareMap(children) {
    const map = {};

    let index = 0;

    for (let child of children) {
        if (["string", "number"].includes(typeof child.key)) {
            if (map[child.key] != undefined) {
                RecursiveConsole.warn(
                    "Recursive Renderer : Duplicate keys detected. Each child should have a unique key."
                );
                return false;
            }
            map[child.key] = index;
        } else {
            return false;
        }

        index++;
    }

    return map;
}

module.exports = prepareElement;
