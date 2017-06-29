function buffer(items, iterFn, cb, timeout = 20) {
    const len = items.length;
    let i = 0;

    setTimeout(function processChunk() {
        const start = Date.now();
        let result;

        for (; i < len && result !== false && (Date.now() - start < 50); i++) {
            result = iterFn.call(items[i], items[i], i);
        }

        if (i < len && result !== false) {
            setTimeout(processChunk, timeout);
        } else {
            cb(items);
        }
    }, timeout);
}

// Use
// Jquery example (memory and process inefficient for big arrays)
$(document).ready(() => {
    $.get('/home/data', (result) => {
        const html = result.reduce((out, item) => {
            out += `<li>${item}</li>`;

            return out;
        }, '');

        $('ul').append(html);
    });
});

// Jquery example (optimized version)
$(document).ready(() => {
    $.get('/home/data', (result) => {
        var html = '';

        buffer(
            result,
            item => html += `<li>${item}</li>`,
            () => $('ul').append(html)
        );
    });
});
