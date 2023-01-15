
class Schema {
    constructor(data) {
        this.data = data;
    }
}

function localDBModel(name, schema) {
    const Model = class {
        constructor(data = {}) {
            this.objecStorageName = name;
            this.data = data;

            for (let prop in schema.data) {
                if (this.data[prop]) continue;
                if (schema.data[prop].required) {
                    throw new Error(`property ${prop} is required`);
                }
                this.data[prop] = schema.data[prop].default;

            }
        }

        static async getAll() {
            return new Promise(resolve => {
                var transaction = this.db.requestTransaction(this.objecStorageName, "readonly");

                transaction.onerror = function () {
                    throw new Error("Something went wrong with our transaction: ", transaction.error);
                };

                var request = transaction.getAll();
                request.onsuccess = function (event) {
                    resolve(request.result);
                };
            })

        }

        static async getById(id) {
            return new Promise(resolve => {

                var transaction = this.db.requestTransaction(this.objecStorageName, "readonly");

                transaction.onerror = function () {
                    throw new Error("Something went wrong with our transaction: ", transaction.error);
                };

                var request = transaction.get(id);
                request.onsuccess = function () {
                    resolve(request.result)
                };
            })

        }

        static async delete(id) {
            return new Promise(async (resolve, reject) => {
                const storage = this.db.requestTransaction("readwrite");

                const request = storage.delete(id);

                request.onsuccess = function (e) {
                    resolve(e);
                };

                request.onerror = function (e) {
                    reject(e);
                }
            });
        }


        async save() {
            const item = await Model.db.insert(this.data);
            return item;
        }

        add() {

        }
    }

    Model.db = null;

    Model.connect = async function (DBName) {
        Model.db = new LocalDB({
            DBName,
            objectStorageName: name
        });

        await Model.db.open();
    }

    return Model;
}

