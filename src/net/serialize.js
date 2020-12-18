const request = require('./http_requests.js');
const foodModel = require('../models/food_model');
const instructionsModel = require('../models/instructions_model');
const keys = require('../api_keys');


class Serialize {
    static async get(url) {
        return request.get(url);
    }

    static async foodData(url) {
        let foodData = [];
        let foodModels = [];
        await this.get(`https://api.spoonacular.com/recipes/complexSearch/?query=pizza&apiKey=${keys.food()}&includeNutrition=false`).then(r => foodData.push(r))
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

    static async instructionData(url) {
        let data;
        await this.get(url).then(r => data = JSON.parse(r));
        data = new instructionsModel({
            dishTypes: data.dishTypes,
            ingredients: data.extendedIngredients,
        })
        return data;
    }
}

module.exports = Serialize
