
const express = require('express')


const { signat, authLocation } = require('../middleware/OGauth.js')
const router = express.Router()
const { admingu, 
        adminif, 
        admintoa, 
        admincat,
        admindt,
                } = require('../middleware/admin_auth.js');
const { adminsignup, 
        adminsignupOTPverify, 
        admininfo, 
        ProductDelete,
        getallAdminpost,
        dateupdate,
        getdates,
        EVENTCreate,
        dashboard,
        EVENTDelete,
        Toadmin,
        bookedlisttoadmin,
        ownerlogin,
        } = require('../controller/admin_controller.js');
const admin_model = require('../model/admin_model.js');

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


module.exports = router;