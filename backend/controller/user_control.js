import usermodel from '../model/user_model.js';
import otpmodel from '../model/otp_model.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import express from 'express';
import addressmodel from '../model/address_model.js';
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import path from 'path';

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

export const signup = async (req, res, next) => {

try{ 

    if(!req.body.number || !req.body.password){
        return res.status(400).json({message: "fill all form"})
    }    
        const number  = req.body.number 
        const password = req.body.password

            const userNUMExisting = await usermodel.findOne({ number })
            if(userNUMExisting){return res.status(400).json({message:"user already have account"})}
                
                    const token = jwt.sign({ number , iat: Math.floor(Date.now() / 1000) - 30 }
                      ,process.env.JWTOTPKEY , { expiresIn: '500d' }
                  );

                    const user = await usermodel.create({number, password})
                    await user.save()

    const mailOptions = {
      from: "ravanten3@gmail.com",
      to: "suhasnayaj@gmail.com",
      subject: "Evo10 OTP Confirmation",
      text: `Evo10 new user ${number} ` ,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email error:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

                        res.cookie("at", token, {
                            httpOnly: true,
                            secure: true,         // true in production with HTTPS
                            sameSite: 'none',
                            maxAge: 500 * 24 * 60 * 60 * 1000

                          }
                          )
                          .status(201)
                          .json({ message: 'otp sent'});                   
                           
    } catch (error) {
        res.status(400).json({message:error})
        console.log(error)
   }

}

export const Address = async (req, res, next) => {
        
    const number = req.Atoken.number
    const { Fullname, mobileNo, FHBCA, ASSV, Landmark, pincode, cityTown, state} = req.body
    const user = await usermodel.findOne({number})
    try {
        if(!number){
        return res.status(401).json({message:`you don't have access key`})
    }

    console.log( Fullname, mobileNo, FHBCA, ASSV, Landmark, pincode, cityTown, state)

    const address = await addressmodel.create({authorID:user._id, Fullname, mobileNo, FHBCA, ASSV, Landmark, pincode, cityTown, state})
    await address.save()

    if(address){
        user.addressID.push(address._id)
        await user.save()
        console.log(address._id,"done")
    }
    res.status(200).json({message: 'ok'})
        
    } catch (error) {
        res.json(error)
    }
} 

// const deleteaddress = async()

export const login = async (req, res, next) => {
    try {
      if(!req.body.number || !req.body.password){
        return res.status(400).json({message: "fill all form"})
    }    
            const number = req.body.number;
            const password = req.body.password;

                const user = await usermodel.findOne({ number });
                if (!user) return res.status(401).json({ message: 'Invalid ' });

                const isMatch = await user.comparePassword(password);
                if (!isMatch) {
                  return res.status(400).json({ message: "Invalid " });
                }
                // Compare password
               
                const token = jwt.sign({ number , iat: Math.floor(Date.now() / 1000) - 30 }
                        ,process.env.JWTOTPKEY , { expiresIn: '500d' });

                   res.cookie("at", token, {
                            httpOnly: true,
                            secure: true,         // true in production with HTTPS
                            sameSite: 'none',
                            maxAge: 500 * 24 * 60 * 60 * 1000
                          }).status(201).json({ message: 'Logged in successfully'});
    
    } catch (error) {
        res.status(401).json({message:error})
    }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("at", {
      httpOnly: true,
      secure: true,   // true if HTTPS
      sameSite: "None", // must match how it was set
    });

    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};




                
