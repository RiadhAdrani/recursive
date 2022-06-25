const { default: Style } = require("./Style");

const event = new Event("click");

/**
 * @param {typeof event} event
 */
const listener = (event) => {};

/**
 * @param {HTMLElement} elem
 * @returns {string}
 */
const hook = (elem) => {};

const GlobalAttributes = {
    accessKey: "",
    autoCapitalize: "",
    autoFocus: "",
    children: [],
    className: "",
    contentEditable: false,
    contextMenu: "",
    dataSet: "",
    dir: "",
    draggable: "",
    enterKeyHint: "",
    exportParts: "",
    hidden: "",
    hooks: {
        onCreated: hook,
        onUpdated: hook,
        onRef: hook,
        beforeDestroyed: hook,
        onDestroyed: hook,
    },
    flags: {
        renderIf: true,
        forceRerender: false,
    },
    id: "",
    inputMode: "",
    is: "",
    itemId: "",
    itemProp: "",
    lang: "",
    nonce: "",
    part: "",
    slot: "",
    spellCheck: "",
    style: Style,
    tabIndex: "",
    title: "",
    translate: "",
};

const GlobalEvents = {
    onAbort: listener,
    onAutoComplete: listener,
    onAutoCompleteError: listener,
    onBlur: listener,
    onCancel: listener,
    onCanPlay: listener,
    onCanPlayThrough: listener,
    onChange: listener,
    onClick: listener,
    onClose: listener,
    onContextMenu: listener,
    onCueChange: listener,
    onDblClick: listener,
    onDrag: listener,
    onDragEnd: listener,
    onDragEnter: listener,
    onDragLeave: listener,
    onDragOver: listener,
    onDragStart: listener,
    onDrop: listener,
    onDurationChange: listener,
    onEmptied: listener,
    onEnded: listener,
    onError: listener,
    onFocus: listener,
    onInput: listener,
    onInvalid: listener,
    onKeyDown: listener,
    onKeyPress: listener,
    onKeyUp: listener,
    onLoad: listener,
    onLoadedData: listener,
    onLoadedMetadata: listener,
    onLoadStart: listener,
    onMouseDown: listener,
    onMouseEnter: listener,
    onMouseLeave: listener,
    onMouseMove: listener,
    onMouseOut: listener,
    onMouseOver: listener,
    onMouseUp: listener,
    onMouseWheel: listener,
    onPause: listener,
    onPlay: listener,
    onPlaying: listener,
    onProgress: listener,
    onRatechange: listener,
    onReset: listener,
    onResize: listener,
    onScroll: listener,
    onSeeked: listener,
    onSeeking: listener,
    onSelect: listener,
    onShow: listener,
    onSort: listener,
    onStalled: listener,
    onSubmit: listener,
    onSuspend: listener,
    onTimeUpdate: listener,
    onToggle: listener,
    onVolumeChange: listener,
    onWaiting: listener,
};

module.exports = { ...GlobalAttributes, ...GlobalEvents };
