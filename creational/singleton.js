const DB = (() => {
    let instance = null;
    const createDB = () => ({});

    return function DB() {
        if (instance === null) {
            instance = createDB();
        }

        return instance;
    };
})();
