Array.prototype.shufle = function () {
    for (let i = this.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [this[i], this[j]] = [this[j], this[i]];

    }
}

Array.prototype.includes = function (element) {
    return this.indexOf(element) > -1;
}

Array.prototype.randomSlice = function (maxLen) {
    const newArr = [];
    const indexes = [];
    let index = 0;
    if (maxLen > this.length) maxLen = this.length;
    while (maxLen--) {
        do {
            index = randomInt(0, this.length - 1);
        } while (indexes.includes(index));

        indexes.push(index);
        newArr.push(this[index])
    }
    return newArr;
}

String.prototype.getNormalized = function () {
    return this.toLocaleLowerCase().trim();
}