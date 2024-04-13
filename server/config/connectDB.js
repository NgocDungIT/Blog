const mongoose = require('mongoose');

const connectDB = async (url) => {
    try {
        mongoose.set('strictQuery', false);
        const connect = await mongoose.connect(url);
        console.log('Database connection successfully ...');
    } catch (err) {
        console.log(`Database connection error: ${err}`);
    }
};

module.exports = connectDB;
