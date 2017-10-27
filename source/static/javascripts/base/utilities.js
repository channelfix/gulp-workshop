function $(selector, context) {
    return (context || document).querySelector(selector);
}

function $$(selector, context) {
    return Array.from((context || document).querySelectorAll(selector));
}
