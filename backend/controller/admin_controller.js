import adminmodel from '../model/admin_model.js';
import adminotpmodel from '../model/admin_otp.js';
import post_model from '../model/event_post_model.js';
import bookmodel from '../model/cart_model.js';
import otpGenerate from 'otp-generator';
import jwt from 'jsonwebtoken';
import usermodel from '../model/user_model.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'


dotenv.config();


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

export const adminsignup = async (req, res, next) => {

    const {number} = req.body;

    try { 
      
    const otp = otpGenerate.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })

    const otpnumber = await adminotpmodel.create({ otp: otp})
    await otpnumber.save()

    const mailOptions = {
      from: "ravanten3@gmail.com",
      to: "suhasnayaj@gmail.com, ravanravana177@gmail.com ",
      subject: "Food OTP Confirmation",
      html: `<h4>Your Food del OTP <h4> 
              <h1><strong>${otp} </strong></h1>
              <h4> verify </h4>
              <p>partner number = ${number} </p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email error:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

     const adminNumber = number
     const token = jwt.sign({ adminNumber , iat: Math.floor(Date.now() / 1000) - 30 }
         ,process.env.ADMINJWTOTPKEY , { expiresIn: '8m' });


      res.cookie("amogu", token, {
          httpOnly: true,
          secure: true,         // true in production with HTTPS
          sameSite: 'none',
          maxAge: 8 * 60 * 1000
          }).status(201).json({message: "otp sent"})
        
    } catch(error) {
      res.status(401).json({error:error.message})
    }

}

export const adminsignupOTPverify = async (req, res, next) => { 
  const number = req.admingu;
  console.log(number);

  try {
    const numExistinAdmin = await adminmodel.findOne({ number: number.adminNumber });
    console.log(numExistinAdmin);

    const { otp } = req.body;
    const findotp = await adminotpmodel.findOne({ otp });
    console.log(findotp);

    if (!findotp) {
      return res.status(401).json({ message: "invalid otp" });
    }

    // clear old cookie
    res.clearCookie("amogu", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    if (numExistinAdmin) {
      // admin already exists
      const token = jwt.sign(
        { adminNumber: number.adminNumber, iat: Math.floor(Date.now() / 1000) - 30 },
        process.env.ADMINJWTOTPKEY,
        { expiresIn: "40d" }
      );

      res.cookie("toa", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 1000 * 1000,
      });

      await findotp.deleteOne({ otp });
      return res.status(201).json({ message: "main", category: numExistinAdmin.category});
    } else {
      // new admin
      const token = jwt.sign(
        { adminNumber: number.adminNumber, iat: Math.floor(Date.now() / 1000) - 30 },
        process.env.ADMINJWTOTPKEY,
        { expiresIn: "5m" }
      );

      res.cookie("amif", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 5 * 60 * 1000,
      });

      await findotp.deleteOne({ otp });
      return res.status(201).json({ message: "otp verified" });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: error.message || "Server error" });
  }
};

export const admininfo = async (req, res, next) => {

        const number = req.adminif.adminNumber
        const { companyName, 
                category, 
                image,
                FHBCA, 
                ASSV, 
                Landmark, 
                pincode, 
                cityTown, 
                state, 
              } = req.body;
console.log("partner info")
      
  try{
      const admininfo = await adminmodel.create({
        number: number,
        companyName:companyName,
        category: category,
        image: image,
        address:{ FHBCA: FHBCA, 
                  ASSV: ASSV,
                  Landmark: Landmark,
                  pincode: pincode,
                  cityTown: cityTown,
                  state: state,
                }
      })

      await admininfo.save()

        res.clearCookie("amif", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
              });

        const user = await usermodel.findOne({number})
        console.log(user)

        const adminNumber = number
        const token = jwt.sign({ adminNumber , iat: Math.floor(Date.now() / 1000) - 30 }
                 ,process.env.ADMINJWTOTPKEY , { expiresIn: '40d' });

          res.cookie('toa', token, {
              httpOnly: true,
              secure: true, // true in production
              sameSite: 'none',
              maxAge: 60 * 60 * 1000 * 1000
            });

            // console.log(user)
            user.role = "admin";
            user.adminID = admininfo._id;
            await user.save()
            
            return res.status(201).json({message:"ok"})

        } catch (error) {
          res.json(error)
      }

}

export const dateupdate = async (req, res, next) => {

  const number = req.admintoa.adminNumber
  const adminuser = await adminmodel.findOne({number})

  const { date } = req.body;

    adminuser.opendates = date; // directly assign array
    await adminuser.save();     // save the updated document

    res.status(200).json({category: adminuser.category})   

}

export const getdates = async (req, res, next) => {
  const number = req.admintoa.adminNumber
  const adminuser = await adminmodel.findOne({number})
  res.status(200).json(adminuser.opendates)
}

//posts
export const EVENTCreate = async (req, res, next) => {

try {

  const number = req.admintoa.adminNumber
  const adminuser = await adminmodel.findOne({number})

    console.log('Eventcategory')
  const {name, 
         price, 
         compareprice, 
         description, 
         image, 
         Eventcategory,
         Landmark,
        } = req.body

        const cityTown = adminuser.address.cityTown
        const companyName = adminuser.companyName
        console.log(cityTown)

        const calculateDiscountPercentage = (originalPrice, salePrice) => {
            if (originalPrice <= 0) return 0;
            const discount = ((originalPrice - salePrice) / originalPrice) * 100;
            return Math.round(discount); // Rounded to nearest integer
         };

         const comparepriceNum = Number(compareprice);
         const priceNum = Number(price);

            const originalPrice = (comparepriceNum * 24 / 100) + comparepriceNum ;

            // const withplatformfee = price * 24 / 100;
            const salePrice =  priceNum * 24 / 100 + priceNum
            console.log(originalPrice, salePrice)
            const discount = calculateDiscountPercentage(originalPrice, salePrice);
   
  if(!image){
    return res.status(404).json({ message: "select images" })
  }
  

  const postData = await post_model.create({ author: adminuser._id,
                                             name:name,
                                             description: description,
                                             price: price,
                                             image: image,
                                             Eventcategory: Eventcategory,
                                             category: adminuser.category,
                                             Landmark: Landmark,
                                             cityTown: cityTown,
                                             discount: discount,
                                             compareprice : originalPrice,
                                             platformFee : salePrice,
                                             companyName: companyName
                                            })
  await postData.save()

  if(postData){
    adminuser.posts.push(postData._id);
    await adminuser.save();
  }
  
  res.status(201).json({message:`post created`, id:`${postData._id}`})
 
} catch (error) {
  res.json(error)
}
  
}

export const dashboard = async (req, res, next) => {
  try {
    const id = req.admintoa.adminNumber
    const author = await adminmodel.findOne({number:id})
    const post = await post_model.find({author: author._id})
    res.status(201).json({post:post, 
                          productlist: post.length,
                        })

  } catch (error) {
    
  }
}

export const EVENTDelete = async (req, res, next) => {

  const number = req.admintoa.adminNumber
  const adminuser = await adminmodel.findOne({number})
  const id = req.params.id
  try {
    const product = await post_model.findById(id);
    console.log(product)
    if(!product){
      return res.status(404).json({ message: "product not found" });
    }

    if(adminuser){
      adminuser.posts.pull(id);
      await adminuser.save();
    }

     const deletedProduct = await post_model.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });

  } catch (error) {
    res.status(500).json({message: "server error",error: error.message  })
  }

}

///getallAdminpost for dashboard

export const getallAdminpost = async (req, res, next) => {
       console.log("suhas")

  try {
      const id = req.admintoa.adminNumber

      const author = await adminmodel.findOne({number:id})

      const post = await post_model.find({author: author._id})
      res.json(post)
    
  } catch (error) {
    res.json({error:error.message})
  }
}

export const Toadmin = async (req, res, next) => {

  const number = req.admintoa.adminNumber

  try {
  
    const admin = await adminmodel.findOne({number: number})

      res.json(admin.category || null)
    
    
  } catch (error) {
    res.json(error)
  }
}

export const bookedlisttoadmin = async(req, res) => {
    const number = req.admintoa.adminNumber

    try {

        const admin = await adminmodel.findOne({number : number})
        const adminpost = admin.posts
        
        const bookedlist = await bookmodel.find({event: adminpost})
        const postlist = await post_model.find({_id: adminpost})

        res.json({bookedlist: bookedlist, postlist: postlist})

    } catch (error) {
        res.json(error)
    }
}

    

