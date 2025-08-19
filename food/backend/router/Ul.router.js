const express = require('express')
const router = express.Router()
const {signat, authLocation} = require('../middleware/OGauth.js')
const { home, setting, address, explore, cartdata, removecart, buy, order, addtocart } = require('../controller/UI.controller.js')
// const event_post_model = require('../model/event_post_model.js')
const user_model = require('../model/user_model.js')
const { sign } = require('crypto')

router.route('/home').get( home )

router.route('/explore').get(explore)

router.route('/setting').get(signat, setting)
router.route('/address-list').get(signat, address)


// Add item to cart
router.route("/cart/add").post( signat, addtocart)
// Get cart
router.route("/cart/get").get(signat, cartdata)
// Remove item
router.route("/remove/:id").delete(signat, removecart)
// Buy (Checkout)
router.route("/buy").post(signat, buy)

router.route("/order").get(signat, order)

module.exports = router

 