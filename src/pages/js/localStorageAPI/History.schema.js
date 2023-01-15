const HistorySchema = new Schema({
    date: {
        default: new Date().toDateString()
    },
    type: {
        required: true
    },
    efficiency: {
        required: true
    },
    _id: {
        required: true
    }
})

const HistoryDB = localDBModel("history", HistorySchema);