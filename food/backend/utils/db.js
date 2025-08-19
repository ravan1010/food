const mongoose = require('mongoose')
require('dotenv').config()


const URL = 'mongodb+srv://ravanravana177:c0RPxHEuxVPyxRgw@cluster0.5m8gkwy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const dbconnection = async () => {

    try {
    await mongoose.connect('mongodb+srv://ravanravana177:c0RPxHEuxVPyxRgw@cluster0.5m8gkwy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log("database connected successfully");  
    } catch (error) {
        console.error("database not connect");
        process.exit(0)
    }
}

module.exports = dbconnection;