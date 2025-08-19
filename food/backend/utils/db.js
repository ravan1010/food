const mongoose = require('mongoose')
require('dotenv').config()


const URL = process.env.DBurl

const dbconnection = async () => {

    try {
    await mongoose.connect(URL);
    console.log("database connected successfully");  
    } catch (error) {
        console.error("database not connect");
        process.exit(0)
    }
}

module.exports = dbconnection;