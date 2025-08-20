import mongoose from 'mongoose';
// const image_model = require('./image_model');

const productSchema = new mongoose.Schema({

    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    name:{
        type:String,
        require:true,
        default:"event",
    },
    category: {
        type: String,
    },
    Eventcategory:{
        type: String
    },
    description:{
        type:String,
        require:true,
    },
    cityTown:{
        type:String,
    },
    Landmark:{
        type:String,
    },
    status:{
        type: String,
        require: true,
        enum: ['normal','home','ads'],
        default:"normal",
    },
    image:[String],

    companyName:{
        type: String,
    },
    
    price:{
        type:Number,
        min:0,
        require:true,
    },

   compareprice:{
    type: String,
    require: true,
   },

    platformFee:{
        type:Number,
        require:true
    },

    deliveryFee:{
        type:Number,
        require:true,
        default: 30,
    },
  
    totalPrice:{
        type:Number,
        default: function () {
            return this.price + this.platformFee;
        },
    },

    rate:{
        type:Number,
        require:true,
    },

},{timestamps: true})


export default new mongoose.model("Product", productSchema);

