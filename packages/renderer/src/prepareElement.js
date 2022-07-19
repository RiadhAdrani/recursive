import { isFlag } from "../flags";
import { isHook } from "../hooks";
import { RecursiveRenderer } from "../";
import prepareChild from "./prepareChild.js";

/**
 * Return a verified tree to be used in rendering or updating
 * @param {import("../../../lib.js").RawElement} element
 * @param {string} id
 * @param {RecursiveRenderer} renderer
 * @return {import("../../../lib.js").RecursiveElement} tree
 */
function prepareElement(element, id, renderer) {
    const _element = {};

    if (!element.elementType) {
        RecursiveConsole.error('"elementType" should not be empty of null', [
            "Make sure to provide a type for your element (ex: div in web)",
        ]);
    }

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

    for (let property in element) {
        if (property === "flag") {
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

            const _child = prepareChild(child, uid, renderer);

            if (_child) {
                if (_child.elementType === "fragment") {
                    _children.push(..._child.children);
                } else {
                    _children.push(_child);
                }
            }
        });

        _element.children = _children;

        const _map = {};

        for (let i = 0; i < _element.children.length; i++) {
            if (
                _element.children[i].key === undefined ||
                _map[_element.children[i].key] !== undefined
            )
                continue;

            _map[_element.children[i].key] = {
                key: _element.children[i].key,
                element: _element.children[i],
                index: i,
            };
        }

        if (Object.keys(_map).length === _element.children.length) _element.map = _map;
    }

    return _element;
}

export default prepareElement;
