
import express from 'express';


import { signat } from '../middleware/OGauth.js';
const router = express.Router();
import { admincat, admingu, adminif, admintoa } from '../middleware/admin_auth.js';
import { admininfo, adminsignup, adminsignupOTPverify, bookedlisttoadmin, dashboard, dateupdate, EVENTCreate, EVENTDelete, getdates, Toadmin } from '../controller/admin_controller.js';

///admin

router.route('/admin').post(signat, adminsignup)
router.route('/admin/otp').post(signat, admingu, adminsignupOTPverify)
router.route('/admin/info').post(signat, adminif, admininfo)

router.route('/opendayupdate').post(signat, admintoa, admincat, dateupdate);
router.route('/openday').get(signat, admintoa, admincat, getdates)

//product 
router.route('/admin/post').post(signat, admintoa, admincat, EVENTCreate  )
router.route('/admin/dashboard').get(signat, admintoa, admincat, dashboard )
router.route('/admin/:id').delete(signat, admintoa, admincat, EVENTDelete)


router.route('/toadmin').get(admintoa, Toadmin)
router.route('/bookedlist').get(admintoa, bookedlisttoadmin)

//admin auth route for frontend
router.get('/adminotp', admingu, (req, res) => {
    res.json({user: req.admingu})
});

router.get('/admininfo', adminif, (req, res) => {
    res.json({user: req.adminif})
});

router.get('/adminmain', admintoa, (req, res) => {
    res.json({user: req.admintoa})

});

//admin category route
router.get('/admincategory', admincat, (req, res) => {
    try {      
    //food
    if(req.cat.categoryid === "adminlandmark"){
        res.json({categoryadminlandmark: req.cat})
    }
    //fashion
    else if(req.cat.categoryid === "clientslandmark"){
        res.json({categoryclientslandmark: req.cat})
    }
    //
    else if(req.cat.categoryid === "Bothlandmark" || req.cat.categoryid === "bothlandmark"){
        res.json({categoryBothlandmark: req.cat})
    }
    else{
        res.json({})
    }

     } catch (error) {
        
    }
})


export default router;
