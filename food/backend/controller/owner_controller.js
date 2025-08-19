const adminmodel = require('../model/admin_model.js')
const adminotpmodel = require('../model/admin_otp.js')
const otpGenerate = require('otp-generator')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const post = require('../model/event_post_model.js')
const user = require('../model/user_model.js')
const order = require('../model/order_model.js');
const { setDefaultResultOrder } = require('dns');

require('dotenv').config()

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

const ownersignup = async (req, res, next) => {

    const {number} = req.body;
    try { 

      // if(){
      //   return res.status(404).json('invalid name')
      // }
      
    const otp = otpGenerate.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })

    const otpnumber = await adminotpmodel.create({ otp: otp})
    await otpnumber.save()

    const mailOptions = {
      from: "ravanten3@gmail.com",
      to: "suhasnayaj@gmail.com",
      subject: "Evo10 OTP Confirmation",
      text: `Your Evo10 OTP is here ${otp} to this number ${number} verify it` ,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email error:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });


          res.status(201).json({message: "otp sent"})
        
    } catch(error) {
      res.status(401).json({error:error.message})
    }

}

const ownersignupOTPverify = async (req, res, next) => { 

          
          const {otp} = req.body

          const findotp = await adminotpmodel.findOne({ otp })

          if(findotp){

          const adminNumber = 'foundersuhascofoundersuhas'
          const token = jwt.sign({ adminNumber , iat: Math.floor(Date.now() / 1000) - 30 }
                 ,process.env.ADMINJWTOTPKEY , { expiresIn: '400d' });

          res.cookie('owner', token, {
              httpOnly: true,
              secure: true, // true in production
              sameSite: 'Strict',
              maxAge: 400 * 24 * 60 * 60 * 1000
            });
        }

        res.json({message: "verified"})

}  


//post get, add, remove, home

const getpostdata = async (req, res, next) => {
  
  const postdata = await post.find()
  res.json(postdata);

}


const postTohomepage = async (req, res) => {

  try {
    const { id } = req.body;
    console.log("post", id);

    const postDoc = await post.findById(id);  // ✅ use model here
    if (!postDoc) {
      return res.json({ message: "product not found" });
    }

    postDoc.status = "home" // ✅ update array
    await postDoc.save();

    res.json({ message: "product add to home page" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};


const removepostinhomepage = async (req, res) => {

  try {
    const { id } = req.body;
    console.log("post", id);

    const postDoc = await post.findById(id);  // ✅ use model here
    if (!postDoc) {
      return res.json({ message: "product not found" });
    }

    postDoc.status = "normal" // ✅ update array
    await postDoc.save();

    res.json({ message: "product remove in home page" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}

//home page posts

const gethomepostdata = async (req, res, next) => {
  
  const homepostdata = await post.find({status: 'home'})
  res.json(homepostdata);

}

//order status

const getorderdata = async (req, res, next) => {
  
const orderdata = await order.find()
  .sort({ createdAt: -1 }) // newest first
  .populate([
    {
      path: "items.productId",   // populate product inside items
    },
    {
      path: "address",           // populate address field
    }
  ]);
  res.json(orderdata);

}

const orderpending = async(req, res) => {
  const orderpend = await order.find({status: 'Pending'})
    .populate([
      {
        path: "items.productId",   // populate product inside items
      },
      {
        path: "address",           // populate address field
      }
    ]);
  res.json(orderpend)
}

const orderProcess = async(req, res) => {
   try {
    const { id } = req.body;
    console.log("post", id);

    const postDoc = await order.findById(id);  // ✅ use model here

    if (!postDoc) {
      return res.json({ message: "product not found" });
    }



    postDoc.status = "Process" // ✅ update array
    await postDoc.save();

    res.json({ message: "order on Process" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}

const ordercancel = async(req, res) => {
   try {
    const { id } = req.body;
    console.log("post", id);

    const postDoc = await order.findById(id);  // ✅ use model here
    if (!postDoc) {
      return res.json({ message: "product not found" });
    }

    postDoc.status = "cancel" // ✅ update array
    await postDoc.save();

    res.json({ message: "order cancelled" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}

const afterorderprocess = async(req, res) => {
  const orderPro = await order.find({status: 'Process'})
    .populate([
      {
        path: "items.productId",   // populate product inside items
      },
      {
        path: "address",           // populate address field
      }
    ]);
  res.json(orderPro)
}

const Tocomplete = async(req, res) =>{
  try {
    const { id } = req.body;
    console.log("post", id);

    const postDoc = await order.findById(id);  // ✅ use model here

    if (!postDoc) {
      return res.json({ message: "product not found" });
    }



    postDoc.status = "complete" // ✅ update array
    await postDoc.save();

    res.json({ message: "order complete" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}

const getordercancel = async(req, res) => {
  const ordercan = await order.find({status: 'cancel'})
    .sort({ createdAt: -1 }) // newest first
    .populate([
      {
        path: "items.productId",   // populate product inside items
      },
      {
        path: "address",           // populate address field
      }
    ]);
  res.json(ordercan)
}

const ordercomplete = async(req, res) => {
  const ordercom = await order.find({status: 'complete'})
    .sort({ createdAt: -1 }) // newest first
    .populate([
      {
        path: "items.productId",   // populate product inside items
      },
      {
        path: "address",           // populate address field
      }
    ]);
  res.json(ordercom)
}

const getuserdata = async (req, res, next) => {
  
  const userdata = await user.find()
  res.json(userdata);

}





module.exports = {ownersignup,
    ownersignupOTPverify,
    getpostdata,
    postTohomepage,
    removepostinhomepage,
    gethomepostdata,
    getorderdata,
    orderpending,
    orderProcess,
    ordercancel,
    afterorderprocess,
    getordercancel,
    Tocomplete,
    ordercomplete,
    
    

}