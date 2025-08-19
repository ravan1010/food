const mongoose = require('mongoose')
require('dotenv').config()


const URL = 'mongodb+srv://ravanravana177:c0RPxHEuxVPyxRgw@cluster0.5m8gkwy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const dbconnection = async () => {

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));

 
}              

module.exports = dbconnection;