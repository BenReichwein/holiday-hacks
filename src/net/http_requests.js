const keys = require('../api_keys');
const https = require('https');

class HTTPRequests {
    static get(extension) {
        return new Promise(function (resolve, reject) {
                https.get(`https://api.spoonacular.com/${extension}&apiKey=${keys.food()}&includeNutrition=true`, (resp) => {
                    let data = '';

                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    resp.on('end', () => {
                        resolve(data)
                    });

                }).on("error", (err) => {
                    throw err
                });
            }
        )
    }
}

module.exports = HTTPRequests

