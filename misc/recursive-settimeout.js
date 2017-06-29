// JQuery example (not deterministic due to network latency)
$(document).ready(() => {
    const ul = $('ul.log');
    let index = 0;

    setInterval(() => {
        const started = Date.now();
        const i = index;

        index++;

        $.get('/home/data', (date) => {
            const end = Date.now();

            ul.append(`<li>Request ${i} started ${end - start / 1000}s ago, and has finished.</li>`);
        });
    }, 5000);
});

// JQuery example (Deterministic. Because it only start next request after last request finished)
$(document).ready(() => {
    const ul = $('ul.log');
    let index = 0;

    setTimeout(function getDate() {
        const started = Date.now();
        const i = index;

        index++;

        $.get('/home/data', (date) => {
            const end = Date.now();

            ul.append(`<li>Request ${i} started ${end - start / 1000}s ago, and has finished.</li>`);

            setTimeout(getDate, 5000);
        });
    }, 5000);
});
