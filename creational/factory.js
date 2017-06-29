const classMap = {
    task: function TaskRepo() {},
    user: function UserRepo() {},
    project: function ProjectRepo() {}
}

class RepoFactory {
    constructor(db) {
        this._db = db;
        this._cache = Object.create(null);
    }

    getRepo(repoType) {
        const Repo = classMap[repoType];

        if (!Repo) {
            throw new Error('Invalid repository tipe');
        }

        if (!this._cache[repoType]) {
            this._cache[repoType] = new Repo(this._db);
        }

        return this._cache[repoType];
    }
}
