class FoodModel{
    constructor({id, title, img, imgType, steps}) {
        this.id = id;
        this.title = title;
        this.img = img;
        this.imgType = imgType;
        this.steps = steps;
    }
}

module.exports = FoodModel
