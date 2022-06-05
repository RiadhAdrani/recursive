import CreateComponent from "../CreateComponent.js";

export default {
    /**
     * @param {CreateComponent} newComponent new component
     * @param {CreateComponent} component current component
     */
    updateInline: (component, newComponent) => {
        let didUpdate = false;

        if (!newComponent.inlineStyle && !component.inlineStyle) return didUpdate;

        if (newComponent.inlineStyle) {
            for (let newProp in newComponent.inlineStyle) {
                if (component.domInstance.style.hasOwnProperty(newProp)) {
                    component.domInstance.style[newProp] = newComponent.inlineStyle[newProp];
                    if (component.inlineStyle) {
                        if (component.inlineStyle[newProp] !== newComponent.inlineStyle[newProp])
                            didUpdate = true;
                    } else didUpdate = true;
                }
            }
            if (component.inlineStyle) {
                for (let prop in component.inlineStyle) {
                    if (
                        component.domInstance.style.hasOwnProperty(prop) &&
                        !newComponent.inlineStyle.hasOwnProperty(prop)
                    ) {
                        component.domInstance.style[prop] = "";
                    }
                }
            }
        } else {
            for (let prop in component.inlineStyle) {
                if (component.domInstance.style.hasOwnProperty(prop)) {
                    component.domInstance.style[prop] = "";
                }
            }
        }
    },
    /**
     * Update component's inline style
     * @param renderStyle rendered htmlElement
     * @param oldStyle current component style : component.style
     * @param newStyle new component style : newComponent.style
     * @deprecated
     */
    updateInlineExcept: (renderStyle, oldStyle, newStyle) => {
        let didChange = false;

        if (!oldStyle) {
            for (let prop in newStyle) {
                if (!["length", "size", "parentRule"].includes(prop)) {
                    if (renderStyle.hasOwnProperty(prop) && newStyle[`${prop}`] !== "") {
                        renderStyle[`${prop}`] = newStyle[`${prop}`];
                    }
                }
            }
            didChange = true;
        } else {
            for (let prop in newStyle) {
                if (!["length", "size", "parentRule"].includes(prop)) {
                    if (oldStyle[`${prop}`] !== newStyle[`${prop}`]) {
                        renderStyle[`${prop}`] = newStyle[`${prop}`];
                        didChange = true;
                    }
                }
            }
        }

        return didChange;
    },
};
