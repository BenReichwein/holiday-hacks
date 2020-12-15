const request = require('../net/http_requests.js');
const foodModel = require('../models/food_model');

class Serialize {
    async get() {
        return await request.get('recipes/complexSearch/?query=pizza')
    }

    async data() {
        let foodData = [];
        let foodModels = [];
        await this.get().then(r => foodData.push(r));
        foodData = JSON.parse(foodData[0]);
        foodData['results'].forEach(element => {
            foodModels.push(new foodModel({
                id: element['id'],
                title: element['title'],
                img: element['image'],
                imgType: element['imageType']
            }))
        });
        return foodModels;
    }
}
new Serialize().data().then(r=>console.log(r))
//run this file to see layout of data

module.exports = Serialize
