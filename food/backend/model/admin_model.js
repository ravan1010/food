const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const adminSchema =  mongoose.Schema({
    number:{
        type: Number,
        require: true,
        },

    companyName:{
        type:String,
        require:true,
    },

    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
    }],

    category: {
        type: String,
        require: true
    },
    image:[String],
    address:{
        FHBCA: {
            type: String,
            require: true,
            default:" ",
        },
        ASSV: {
            type: String,
            require: true,
            default: " ",
        },
        Landmark: {
            type: String,
            require: true,
            default: " ",
        },
        pincode: {
            type: Number,
            require: true,
            default: " ",
        },
        cityTown: {
            type: String,
            require: true,
            default: " ",
        },
        state:{
            type: String,
            require: true,
            default: " ",
        }
    },
        // eventBooking: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        // },
    opendates:[String],
    lastLogin: {
        type: Date,
        default: Date.now
    },
     isAdmin : {
        type: Boolean,
        default: true,
    },
    adminresetPasswordToken: String,
    adminresetPasswordExpareAt: Date,
    adminverificationToken: String,
    adminverificationTokenExpareAt: Date,

},{timestamps : true})

// UserSchema.pre()

 adminSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
})

//user password compare 
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

//

module.exports = new mongoose.model("admin", adminSchema);

