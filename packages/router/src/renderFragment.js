const { RecursiveRouter } = require("..");
const findMatch = require("./findMatch");

/**
 * Return the component matching the current context.
 * @param {RecursiveRouter} router
 * @returns {any} component
 */
function renderFragment(router) {
    const routerContext = router.routerContext;

    if (routerContext.depth > routerContext.fragments.length) return "";

    const expected = routerContext.fragments.slice(0, routerContext.depth).reduce((prev, val) => {
        return `${prev}${val}`;
    });

    const fragment = findMatch(expected, router);

    let fragmentComponent;

    if (fragment) {
        fragmentComponent = fragment.isDynamic
            ? fragment.template.component()
            : fragment.component();
    } else {
        fragmentComponent = "";
    }

    return fragmentComponent;
}

module.exports = renderFragment;
