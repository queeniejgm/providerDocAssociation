const mongoose = require("mongoose");

module.exports = (DB) => {
    mongoose.connect(`mongodb+srv://wyatt:CHc4xSpvacyBbuk7@${DB}.jcqnd.mongodb.net/Employee_Documents?retryWrites=true&w=majority`)
        .then(() => console.log(`connected to ${DB}`))
        .catch(() => console.log(`DIDNT connect to ${DB}`))
}