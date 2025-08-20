// models/Cart.js
import mongoose from 'mongoose';


const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
  price: {type: Number}
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  number: { type: Number, required: true},
  address: { type: mongoose.Schema.Types.ObjectId, ref: "address", required: true },
  status:{
        type: String,
        enum: ['Pending','cancel','Process','complete'],
        default:"Pending",
    },
  totalAmount: { type: Number },
}, { timestamps: true });

export default new mongoose.model("Order", orderSchema);
