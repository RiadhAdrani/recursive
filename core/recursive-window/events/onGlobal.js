import { updateOn } from "../../recursive-state/RecursiveState.js";
import handler from "./handler.js";

import on from "./on.js";

export default (winEvent, store, listener, checkTarget = true) => {
    if (window[store]) throw `Global event ${store} cannot be overriden.`;

    function clean() {
        window[store].items = window[store].items.filter((ele) => document.contains(ele));
    }

    function notify(target) {
        if (!target || !document.contains(target)) return;

        updateOn(() => {
            window[store].items.forEach((element) => {
                if (!element.contains(target)) element.events[listener]();
            });
        });

        clean();
    }

    window[store] = { items: [], notify: () => notify(document.body) };

    on(winEvent, (e) => {
        if (!Array.isArray(window[store].items)) return;

        const target = e.target;

        updateOn(() => {
            window[store].items.forEach((element) => {
                if (checkTarget && element.contains(target)) return;

                element.events[listener](e, () => notify(e.target));
            });
        });

        clean();
    });
};