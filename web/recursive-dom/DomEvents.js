import { handler } from "../recursive-window/RecursiveWindow.js";

const list = {
    // Standard Events

    onAbort: { listener: "abort", on: "onabort" },
    onAnimationEnd: { listener: "animationend", on: "onanimationend" },
    onAnimationIteration: { listener: "animationiteration", on: "onanimationiteration" },
    onAnimationStart: { listener: "animationstart", on: "onanimationstart" },
    onAnimationEnd: { listener: "animationend", on: "onanimationend" },
    onBeforePrint: { listener: "beforeprint", on: "onbeforeprint" },
    onBeforeUnload: { listener: "beforeunload", on: "onberforeunload" },
    onBlur: { listener: "blur", on: "onblur" },
    onCanPlay: { listener: "canplay", on: "oncanplay" },
    onCanPlayThrough: { listener: "canplaythrough", on: "oncanplaythroug" },
    onChange: { listener: "change", on: "onchange" },
    onClick: { listener: "click", on: "onclick" },
    onContextMenu: { listener: "contextmenu", on: "oncontextmenu" },
    onCopy: { listener: "copy", on: "oncopy" },
    onCut: { listener: "cut", on: "oncut" },
    onDoubleClick: { listener: "dblclick", on: "ondblclick" },
    onDrag: { listener: "drag", on: "ondrag" },
    onDragEnd: { listener: "dragend", on: "ondragend" },
    onDragEnter: { listener: "dragenter", on: "ondragenter" },
    onDragLeave: { listener: "dragleave", on: "ondragleave" },
    onDragOver: { listener: "dragover", on: "ondragover" },
    onDragStart: { listener: "dragstart", on: "ondragstart" },
    onDrop: { listener: "drop", on: "ondrop" },
    onDurationChange: { listener: "durationchange", on: "ondurationchange" },
    onEnded: { listener: "ended", on: "onended" },
    onError: { listener: "error", on: "onerror" },
    onFocus: { listener: "focus", on: "onfocus" },
    onFocusIn: { listener: "focusin", on: "onfocusin" },
    onFocusOut: { listener: "focusout", on: "onfocusout" },
    onFullScreenChange: { listener: "fullscreenchange", on: "onfullscreenchange" },
    onHashChange: { listener: "hashchange", on: "onhashchange" },
    onInput: { listener: "input", on: "oninput" },
    onInvalid: { listener: "invalid", on: "oninvalid" },
    onKeyDown: { listener: "keydown", on: "onkeydown" },
    onKeyPress: { listener: "keypress", on: "onkeypress" },
    onKeyUp: { listener: "keyup", on: "onkeyup" },
    onLoad: { listener: "load", on: "onload" },
    onLoadedData: { listener: "loadeddata", on: "onloadeddata" },
    onLoadedMetaData: { listener: "loadedmetadata", on: "onloadedmetadata" },
    onLoadStart: { listener: "loadstart", on: "onloadstart" },
    onMessage: { listener: "message", on: "onmessage" },
    onMouseDown: { listener: "mousedown", on: "onmousedown" },
    onMouseEnter: { listener: "mouseenter", on: "onmouseenter" },
    onMouseLeave: { listener: "mouseleave", on: "onmouseleave" },
    onMouseMove: { listener: "mousemove", on: "onmousemove" },
    onMouseOver: { listener: "mouseover", on: "onmouseover" },
    onMouseOut: { listener: "mouseout", on: "onmouseout" },
    onMouseUp: { listener: "mouseup", on: "onmouseup" },
    onOffline: { listener: "offline", on: "ononffline" },
    onOnline: { listener: "online", on: "ononline" },
    onOpen: { listener: "open", on: "onopen" },
    onPageHide: { listener: "pagehide", on: "onpagehide" },
    onPageShow: { listener: "pageshow", on: "onpageshow" },
    onPaste: { listener: "paste", on: "onpaste" },
    onPause: { listener: "pause", on: "onpause" },
    onPlay: { listener: "play", on: "onplay" },
    onPlaying: { listener: "playing", on: "onplaying" },
    onPopState: { listener: "popstate", on: "onpopstate" },
    onProgress: { listener: "progress", on: "onprogress" },
    onRateChange: { listener: "ratechange", on: "onratechange" },
    onResize: { listener: "resize", on: "onresize" },
    onReset: { listener: "reset", on: "onreset" },
    onScroll: { listener: "scroll", on: "onscroll" },
    onSearch: { listener: "search", on: "onsearch" },
    onSeeked: { listener: "seeked", on: "onseeked" },
    onSeeking: { listener: "seeking", on: "onseeking" },
    onSelect: { listener: "select", on: "onselect" },
    onSelectionChange: { listener: "selectionchange", on: "onselectionchange" },
    onShow: { listener: "show", on: "onshow" },
    onStalled: { listener: "stalled", on: "onstalled" },
    onStorage: { listener: "storage", on: "onstorage" },
    onSubmit: { listener: "submit", on: "onsubmit" },
    onSuspend: { listener: "suspend", on: "onsuspend" },
    onTimeUpdate: { listener: "timeupdate", on: "ontimeupdate" },
    onToggle: { listener: "toggle", on: "ontoggle" },
    onTouchCancel: { listener: "touchcancel", on: "ontouchcancel" },
    onTouchEnd: { listener: "touchend", on: "ontouchend" },
    onTouchMove: { listener: "touchmove", on: "ontouchmove" },
    onTouchStart: { listener: "touchstart", on: "ontouchstart" },
    onTransitionEnd: { listener: "transitionend", on: "ontransitionend" },
    onUnload: { listener: "unload", on: "onunload" },
    onVolumeChange: { listener: "volumnechange", on: "onvolumechange" },
    onWaiting: { listener: "waiting", on: "onwaiting" },
    onWheel: { listener: "wheel", on: "onwheel" },

    // Recursive Window events

    onClickGlobal: handler("onclickglobal"),
    onResizeGlobal: handler("onresizeglobal"),
    onKeyUpGlobal: handler("onkeyupglobal"),
    onContextMenuGlobal: handler("oncontextmenuglobal"),
    onScrollGlobal: handler("onscrollglobal"),
};

function is(key) {
    return list[key] !== undefined;
}

function get(key) {
    return list[key];
}

function hasHandler(key) {
    return is(key) && get(key).handler !== undefined;
}

function getListener(key) {
    return get(key).listener;
}

export { is, get, hasHandler, getListener };
