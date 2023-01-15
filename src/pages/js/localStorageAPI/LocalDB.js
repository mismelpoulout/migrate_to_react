class LocalDB {
    constructor({ DBName, objectStorageName }) {
        this.db = null;
        this.DBName = DBName;
        this.objectStorageName = objectStorageName;

        if (!LocalDB.isAvailable) {
            throw new Error("indexedDB is unavialble")
        }
    }

    open() {
        return new Promise((resolve, reject) => {
            var solicitud = indexedDB.open(this.DBName);

            solicitud.onsuccess = (function (e) {
                this.db = e.target.result;
                resolve(this);
            }).bind(this);

            solicitud.onupgradeneeded = (function (e) {
                this.db = e.target.result;
                this.db.createObjectStore(this.objectStorageName, { keyPath: "_id" });
            }).bind(this);

            solicitud.onerror = function (e) {
                reject(e);
            };
        });
    }

    insert(item) {
        return new Promise(async (resolve, reject) => {
            const storage = this.requestTransaction("readwrite");

            if (!item._id) {
                item._id = randomID();
            }

            console.log(item)


            const request = storage.add(item);

            request.onsuccess = function () {
                resolve(item);
            };

            request.onerror = function (e) {
                reject(e);
            }
        });

    }

    getAllKeys() {
        return new Promise(resolve => {
            const transaction = this.requestTransaction(this.objecStorageName, "readonly");

            transaction.oncomplete = function () {
                console.log("All done!");
            };

            transaction.onerror = function () {
                console.log("Something went wrong with our transaction: ", transaction.error);
            };

            const request = transaction.getAllKeys();
            request.onsuccess = function (event) {
                resolve(request.result);
            };
        })
    }

    getItem() {
        return new Promise((resolve, reject) => {
            const request = this.requestTransaction("readonly")
            const cursor = request.openCursor();

            const data = [];
            cursor.onsuccess = function (e) {
                const cursor = e.target.result;

                if (cursor) {
                    cursor.value._id = cursor.key;
                    data.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(data);
                }
            }
        });
    }

    deleteItem(id) {
        const storage = this.requestTransaction("readwrite");

        const request = storage.delete(id);
        console.log(request)
        request.onsuccess = function () {
            resolve(id);
        };

        request.onerror = function (e) {
            reject(e);
        }
    }

    updateItem(id) {
        return randomID();
    }

    requestTransaction(type) {
        return this.db.transaction([this.objectStorageName], type)
            .objectStore(this.objectStorageName);
    }

    static get isAvailable() {
        return window.indexedDB;
    }
}

function randomID(chars = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", length = 20) {
    let id = "";
    while (length--) {
        id += chars[(Math.random() * chars.length) | 0];
    }
    return id;
}