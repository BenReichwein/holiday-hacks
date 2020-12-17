const request = require('./http_requests.js');
const instructionModel = require('../models/instruction_model');

class findInstructions {
    async get() {
        return await request.get('/recipes/656329/analyzedInstructions?stepBreakdown=true')
    }

    async data() {
        let instructionData = [];
        let instructionModels = [];
        await this.get().then(r => instructionData.push(r));
        instructionData = JSON.parse(instructionData[0]);
        instructionData.forEach(element => {
            instructionModels.push(new instructionModel({
                steps: element['steps'],
            }))
        });
        return instructionModels;
    }
}
new findInstructions().data().then(r=>console.log(r))
//run this file to see layout of data

module.exports = findInstructions