function loadQuizQuestions() {
    return quizQuestions;
}


function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', () => {
            reject(new Error(`Failed to load ${url}`));
        });
        img.src = url;
    });
}

async function getImage(url) {
    let image = await ImageDB.getById(url);

    if (!image) {
        image = {};
        const img = await loadImage(url);
        if (LocalDB.isAvailable) {
            image.dataURL = IMGToDataURL(img);
            new ImageDB({ _id: url, dataURL: image.dataURL }).save();
        }
        console.log("carga normal")

    }
    const img = new Image();
    img.src = image.dataURL;

    return img;
}