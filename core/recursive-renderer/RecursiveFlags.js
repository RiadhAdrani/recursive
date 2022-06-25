const list = { forceRerender: "force-rerender", renderIf: "render-if" };

function isFlag(flag) {
    if (!list[flag]) return false;

    return true;
}

export { isFlag };
