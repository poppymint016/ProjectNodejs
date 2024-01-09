const mongoose = require('mongoose');

const { MONGO_URI } = process.env;
console.log("MONGO_URI:", MONGO_URI);

exports.connect = () => {

    if (!MONGO_URI) {
        console.error('MONGO_URI is not defined in the environment variables.');
        process.exit(1);
      }

    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(error => {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    });
}

