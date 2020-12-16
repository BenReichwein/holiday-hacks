const mongoose = require('mongoose')

const db = async () => {
    try {
        mongoose.set('useUnifiedTopology', true);
        mongoose.set('useCreateIndex', true);
        await mongoose.connect('mongodb+srv://ian:o5uuQy4dR2aZkuYq@holiday-hack.g7ehq.mongodb.net/test',
        { useNewUrlParser: true },
        () => console.log('[CONNECTED] - Database'))
    } catch (error) {
        console.log(`db error:${error}`)
    }
}
module.exports = db