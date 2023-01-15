const DOMQueryCache = {};

function $(selectors, refresh = false) {
    if (!DOMQueryCache[selectors] || refresh) {
        return DOMQueryCache[selectors] = document.querySelector(selectors);
    }
    return DOMQueryCache[selectors];
}

function setCSSProp(name, val) {
    window.document.documentElement.style.setProperty(name, val);
}

function IMGToDataURL(img) {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext("2d").drawImage(img, 0, 0);
    return canvas.toDataURL();
}


function createElement(type, props = {}) {
    const element = document.createElement(type);

    for (let [key, value] of Object.entries(props)) {
        if (typeof value != "object") {
            if (key == "classList") {
                element.classList.add(...value.split(" "));
                continue;
            }
            element[key] = value;
            continue;
        }
        if (key == "childs") {
            value.forEach(child => element.appendChild(child));
            continue;
        }
        for (let [key2, value2] of Object.entries(value)) {
            element[key][key2] = value2;
        }
    }
    return element;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function openInNewTab(href) {
    Layer.open("confirm");
    $("#openInNewTab").href = this.dataset ? this.dataset.href : href;
}

function randomInt(min, max) {
    return Math.random() * ((++max - min) + min) | 0;
}


class EventEmitter {
    constructor() {
        this.events = {};
    }

    existEvent(eventName) {
        return typeof this.events[eventName] === 'object';
    }

    on(eventName, listener) {
        if (!this.existEvent(eventName)) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
        return () => this.removeListener(eventName, listener);
    }

    removeListener(eventName, listener) {
        if (!this.existEvent(eventName)) return;

        const idx = this.events[eventName].indexOf(listener);
        if (idx > -1) {
            this.events[eventName].splice(idx, 1);
        }
    }

    emit(eventName, ...args) {
        if (!this.existEvent(eventName)) return;
        this.events[eventName].forEach(listener => listener(...args));
    }
}

class Timer {
    constructor(minutes) {
        this.minutes = minutes;
        this.seconds = 0;

        this.interval = null;

        this._events = new EventEmitter();

        this.update = () => {
            if (this.seconds > 0) {
                this.seconds--;
            } else {
                this.minutes--;
                this.seconds = 59;
            }

            if (this.minutes == 0 && this.seconds == 0) {
                window.clearInterval(this.interval);
                this._events.emit("update", this.minutes, this.seconds);
                this._events.emit("timeout");
            } else {
                this._events.emit("update", this.minutes, this.seconds);
            }
        };
    }

    on(eventName, listener) {
        this._events.on(eventName, listener);
    }

    stop() {
        window.clearInterval(this.interval);
    }

    start() {
        this._events.emit("update", this.minutes, this.seconds);
        this.interval = setInterval(this.update, 1000);
    }
}

async function addHistory(type, efficiency) {
    new HistoryDB({
        type,
        efficiency,
        date: new Date().toLocaleString(),
        _id: new Date().toLocaleString().replace(/[/]/g, "").replace(/[:]/g, "").replace(" ", "")
    }).save();
}