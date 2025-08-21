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

    if(req.body.number){
        const number  = req.body.number
        // console.log(req.body.number,"to", number)
            const userNUMExisting = await usermodel.findOne({ number })
            if(userNUMExisting){return res.status(400).json({message:"user already have account"})}
                
                    // const otp = otpGenerate.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false })

                    const token = jwt.sign({ number , iat: Math.floor(Date.now() / 1000) - 30 }
                      ,process.env.JWTOTPKEY , { expiresIn: '500d' }
                  );

                    // const otpEmail = await otpmodel.create({ otp })
                    // await otpEmail.save()
                    const user = await usermodel.create({number})
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
                           

    }else{
        res.status(400).json({message: "fill all form"})
        console.log('fill')
    }    
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
        if(req.body.number ){
            const number = req.body.number;

                const user = await usermodel.findOne({ number });
                if (!user) return res.status(401).json({ message: 'Invalid number or password' });

                // Compare password
               
                const token = jwt.sign({ number , iat: Math.floor(Date.now() / 1000) - 30 }
                        ,process.env.JWTOTPKEY , { expiresIn: '500d' });

                    res.cookie('at', token, {
                        httpOnly: true,
                        secure: true, // true in production
                        sameSite: 'Strict',
                        maxAge: 500 * 24 * 60 * 60 * 1000
                    }).status(201).json({ message: 'Logged in successfully'});
    
        }else{
            res.status(401).json({message:"fill all"})
        }
    } catch (error) {
        res.status(401).json({message:error})
    }
}

export const logout = async (req, res, next) => {
 try {
    res.clearCookie('at', {
                        httpOnly: true,
                        secure: true, // true in production
                        sameSite: 'Strict',
      })
      res.status(200).json({message:"logout successfully"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
}


                
