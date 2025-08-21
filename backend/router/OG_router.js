import express from 'express';
import { Address, login, logout, signup } from '../controller/user_control.js';
import { authLocation, signat } from '../middleware/OGauth.js';
const router = express.Router()

router.route('/signup').post(signup)
router.route('/to/address').post( signat, Address)


router.route('/login').post(login)
router.route('/logout').post(signat, logout)
 

//auth check for frontend

router.get('/token', signat, async(req, res) => {
    res.json({user: req.Atoken})
    console.log(req.user)
});

router.get('/authlocation', authLocation, async(req, res) => {
    res.json({user: req.location})
    console.log(req.user)
});


export default router;
