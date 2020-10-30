function Food(img) {
    this.row = parseInt(Math.random() * 25);
    this.col = parseInt(Math.random() * 30);
    this.img = img
}

Food.prototype.appearFood = function() {
    this.row = parseInt(Math.random() * 25);
    this.col = parseInt(Math.random() * 30);
}