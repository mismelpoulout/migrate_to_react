class Layer {
    static open(layerName, layerTitle) {
        const element = $(`#layer-${layerName}`);
        element.classList.add("active");
        $("#btn-closeLayer").classList.add("active");
        Layer._events.emit("open", { layerName, layerTitle });
        Layer.stack.push({ element, layerTitle });
    }

    static closeCurrent() {
        const currentLayer = Layer.stack.pop();
        currentLayer.element.classList.remove("active");
        Layer._events.emit("close", currentLayer);
        if (!Layer.stack.length) {
            Layer._events.emit("stackEmpty");
            $("#btn-closeLayer").classList.remove("active");
        }
    }

    static assignTrigger(trigger) {
        trigger.addEventListener("click", () => {
            const { layername, layertitle } = trigger.dataset;
            if ($("#layer-side-nav").classList[1]) {
                Layer.closeCurrent();
            }
            Layer.open(layername, layertitle);
        });
    }

    static closeAll() {
        for (let i = this.stack.length; i > 0; --i) {
            Layer.closeCurrent();
        }
    }

    static on(eventName, listener) {
        Layer._events.on(eventName, listener);
    }

    static removeEvent(eventName, listener) {
        Layer._events.removeListener(eventName, listener);
    }
}

Layer.stack = [];
Layer._events = new EventEmitter;
