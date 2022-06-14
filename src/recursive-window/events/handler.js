export default (store) => {
    return {
        listener: store,
        on: "on" + store,
        handler: (element) => {
            if (window[store] && window[store].items) window[store].items.push(element);
        },
    };
};
