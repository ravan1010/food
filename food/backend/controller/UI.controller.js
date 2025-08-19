const admin_model = require('../model/admin_model.js')
const post_model = require('../model/event_post_model.js')
const usermodel = require('../model/user_model.js')
const book_model = require('../model/cart_model.js')
const address_model = require('../model/address_model.js')
const Cart = require("../model/cart_model.js");
const order_model = require('../model/order_model.js')


const nodemailer = require("nodemailer");

require('dotenv').config()


const home = async(req, res, next) => {
    
    try {

        const post = await post_model.find({status: 'home'})
            console.log(post)
        res.json(post)
       

    } catch (error) {
        res.json(error)
    }
}

const explore = async(req, res) => {
    console.log('explore')
    const exploreData = await post_model.find() 
    res.json(exploreData)
}

const address = async (req, res, next) => {

    const number = req.Atoken.number 
    try {
        const user = await usermodel.findOne({number: number})
        const address = await address_model.find({ authorID: user._id})
        console.log(address,'suhas')
        res.json({address: address})

    } catch (error) {
        res.json(error)
    }
}

const transporter = nodemailer.createTransport({

    service: 'gmail',
    port: 587,
    starttls: {
        enable: true
    },
    secureConnection: true,
    auth: {
      user: 'ravanten3@gmail.com',
      pass: process.env.emailpass
    }
  });

const setting = async (req, res, next) => {
    
    const number = req.Atoken.number
    // const number = req.admintoa.adminNumber

    try {
        const name = await usermodel.findOne({ number : number })
        console.log(name.number)
        res.json({number: name.number})
    } catch (error) {
        res.json(error)
    }
}

const addtocart = async(req, res) => {

  try {
    const { productId, quantity, price} = req.body;
    console.log("add");

    const number = req.Atoken.number;
    const user = await usermodel.findOne({ number });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let cart = await Cart.findOne({ userId: user._id });

    if (!cart) {
      cart = new Cart({ userId: user._id, items: [] });
    }

    const existingItem = cart.items.find(
      item => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity,
      existingItem.price += price, 
      cart.totalAmount += price;
    } else {
      cart.items.push({ productId, quantity, price });
    }

    await cart.save();
    res.json({ message: "Item added to cart", cart });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

const cartdata = async(req, res) => {

    try {

        const number = req.Atoken.number;
        const user = await usermodel.findOne({ number });

        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }

        const cart = await Cart.findOne({ userId: user._id }).populate("items.productId");

        if (!cart) {
            console.log("Cart is empty");
            return res.json({ items: [] });
            }
  // console.log(cart.items[0].productId)
        res.json(cart);

    } catch (error) {
        res.json(error)
    }


 
}

const removecart = async(req, res) => {

    try {        
           const number = req.Atoken.number;
            const user = await usermodel.findOne({ number });
        
            if (!user) {
              return res.status(404).json({ message: "User not found" });
            }
          let cart = await Cart.findOne({ userId: user._id });
          if (!cart) return res.status(404).json({ message: "Cart not found" });
        
          cart.items = cart.items.filter(item => item._id.toString() !== req.params.id);
          await cart.save();
          res.json({ message: "Item removed", cart });
        
        
    } catch (error) {
        res.json(error)
    }
}

const buy = async(req, res) => {

  try {
    const { Mobnumber, address } = req.body;

    console.log(address)

    const number = req.Atoken.number;
    const user = await usermodel.findOne({ number });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 1. Fetch the user's cart
    const cart = await Cart.findOne({ userId: user._id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    // 2. Calculate total (adding 30 fee for each item, if that's what you mean)
    const totalAmount = cart.items.reduce((sum, item) => sum + item.price, 0) + 30;

    // 3. Create order
    const order = new order_model({
      userId: user._id,
      number: Mobnumber,
      address: address,
      items: cart.items,
      totalAmount
    });

    await order.save();

      const mailOptions = {
      from: "ravanten3@gmail.com",
      to: "suhasnayaj@gmail.com",
      subject: "Food order",
      html: `<h4> Food <h4> 
              <h1><strong>number : ${Mobnumber} </strong></h1>
              <h4> amount : ${totalAmount} </h4>
              <p>order id : ${order._id} </p>`    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email error:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    // 4. Delete the user's cart
    await Cart.deleteOne({ userId: user._id });

    res.json({ message: "Purchase successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }

}

const order = async(req, res) => {

    const number = req.Atoken.number;
    const user = await usermodel.findOne({ number });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   const order = await order_model.find({ userId: user._id })
  .sort({ createdAt: -1 }) // ✅ sorting is done here on the main query
  .populate({
    path: "items.productId",   // ✅ path is required
    select: "name image price"
  });

    
    res.json(order)
}

module.exports = { 
                  home, 
                  setting,
                  address,
                  explore,
                  addtocart,
                  cartdata,
                  buy,
                  removecart,
                  order
                }



