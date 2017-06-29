class Book {
    constructor(name, price) {
        this._name = name;
        this._price = price;
        this._pricaChangingListeners = [];
        this._priceChangedListeners = [];
    }

    get name() {
        return this._name;
    }

    set name(val) {
        this._name = val;
    }

    get price() {
        return this._price;
    }

    set price(val) {
        if (
            val === undefined ||
            val === this._price ||
            !this._pricaChangingListeners.every(listener => listener(this, val))
        ) {
            return;
        }

        this._price = val;

        this._priceChangedListeners.forEach(listener => listener(this));
    }

    onPriceChanging(listener) {
        this._pricaChangingListeners.push(listener);
    }

    onPriceChanged(listener) {
        this._priceChangedListeners.push(listener);
    }
}

// Use
const book = new Book('Javascript: The Good Parts', 23.99);

console.log(`The name is: ${book.name}`);
console.log(`The price is: $${book.price}`);

book.onPriceChanging((book, price) => {
    if (price > 100) {
        console.log('System error, price has gone unexpectedly high');

        return false;
    }

    return true;
});

book.onPriceChanged((book) => {
    console.log(`The book price has changed to: $${book.price}`);
});

book.price = 19.99;
book.price = 200;
