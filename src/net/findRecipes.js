const request = require('./http_requests.js');
const foodModel = require('../models/food_model');

<<<<<<< HEAD:src/net/serialize.js
class Serialize {
    static async get() {
        return request.get('recipes/complexSearch/?query=pizza');
=======
class findRecipes {
    async get() {
        return await request.get('recipes/complexSearch/?query=pizza')
>>>>>>> fa40875ee4c9dcdc6ae6dfeacc600da9f0ca0750:src/net/findRecipes.js
    }

    static async data() {
        let foodData = [];
        let foodModels = [];
        await this.get().then(r => foodData.push(r))
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
<<<<<<< HEAD:src/net/serialize.js
=======
new findRecipes().data().then(r=>console.log(r))
//run this file to see layout of data
>>>>>>> fa40875ee4c9dcdc6ae6dfeacc600da9f0ca0750:src/net/findRecipes.js

module.exports = findRecipes