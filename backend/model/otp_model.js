import mongoose from 'mongoose';

const otpSchema =  mongoose.Schema({
    email:{
        type: String,
        require: true,
        },
    MOBnumber:{
            type: Number,
            require: true
        },
    password : {
        type : String,
        require: true,
        },
    otp:{
        type: Number,
        require: true
    },
    resetotp :{
        type: Number,
        require: true,
    },
    createdAt :{
        type: Date,
        default: Date.now,
        expires: 60
    }

})

export default new mongoose.model("otp", otpSchema)