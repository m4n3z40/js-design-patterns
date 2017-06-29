class Calc {
    constructor(start) {
        this.result = start;
    }

    add(x) {
        this.result += x;

        return this;
    }

    multiply(x) {
        this.result *= x;
        
        return this;
    }

    equals(cb) {
        cb(this.result);

        return this;
    }
}

// Use
new Calc(0)
    .add(1)
    .add(2)
    .multiply(3)
    .equals(result => console.log(result));