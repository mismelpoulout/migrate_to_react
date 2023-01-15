const ImageSchema = new Schema({
    _id: {
        required: true
    },
    dataURL: {
        required: true
    }

})

const ImageDB = localDBModel("images", ImageSchema);