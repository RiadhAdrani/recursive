export default (winEvent, handler) => {
    function onHandler(e) {
        handler(e);
    }

    window.addEventListener(winEvent, onHandler);
};
