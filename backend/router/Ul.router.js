import express from 'express';
const router = express.Router()
import {signat, authLocation} from '../middleware/OGauth.js';
import { home, setting, address, explore, cartdata, removecart, buy, order, addtocart } from '../controller/UI.controller.js';
// const event_post_model = require('../model/event_post_model.js')
import user_model from '../model/user_model.js';



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

export default router;

 