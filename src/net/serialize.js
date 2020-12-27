const request = require('./http_requests.js');
const foodModel = require('../models/food_model');

class Serialize {
    static async get(url) {
        return request.get(url);
    }

    static async foodData(url) {
        let foodData = [];
        let foodModels = [];
        await this.get(url).then(r => foodData.push(r))
        foodData = JSON.parse(foodData[0]);
        foodData['results'].forEach(element => {
            foodModels.push(new foodModel({
                id: element['id'],
                title: element['title'],
                img: element['image'],
                imgType: element['imageType'],
            }))
        });
        return foodModels;
    }

    static async instructionData(url, model) {
        let data;
        await this.get(url).then(r => data = JSON.parse(r));
        model.steps = data[0];
        return model.steps;
    }
}

module.exports = Serialize
