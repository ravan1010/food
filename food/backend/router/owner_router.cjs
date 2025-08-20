const express = require('express')
const { ownersignup, ownersignupOTPverify, imageCreate, imagedelete, getpostdata, postTohomepage, removepostinhomepage, getorderdata, orderpending, orderProcess, ordercancel, getordercancel, afterorderprocess, Tocomplete, ordercomplete } = require('../controller/owner_controller.cjs')
const { ownertoken } = require('../middleware/owner.cjs')
const router = express.Router()

router.route('/owner/log').post(ownersignup)
router.route('/owner/verify').post(ownersignupOTPverify)

router.route('/owner/getpostdata').get(ownertoken, getpostdata)
router.route('/owner/postTohomepage').post(ownertoken, postTohomepage)
router.route('/owner/removepostinhomepage').post(ownertoken, removepostinhomepage)


//order status
router.route('/owner/getorderdata').get(ownertoken, getorderdata)

router.route('/owner/orderpending').get(ownertoken, orderpending)

router.route('/owner/orderProcess').post(ownertoken, orderProcess)
router.route('/owner/ordercancel').post(ownertoken, ordercancel)

router.route('/owner/getordercancel').get(ownertoken, getordercancel)

router.route('/owner/afterorderprocess').get(ownertoken, afterorderprocess)
router.route('/owner/Tocomplete').post(ownertoken, Tocomplete)

router.route('/owner/ordercomplete').get(ownertoken, ordercomplete)



// router.route('/owner/image').post(ownertoken, imageCreate)
// router.route('/owner/delete/:id').delete(ownertoken, imagedelete)

 
 
router.get('/owner/token', ownertoken, (req, res) => {
    res.json({owner: req.owner})
});

module.exports = router
