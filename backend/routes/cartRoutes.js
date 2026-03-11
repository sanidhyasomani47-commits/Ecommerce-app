import express from 'express'
import {addtocart,getusercart,updatecart} from '../controller/cartController.js'
import authUser from '../middleware/auth.js'

const cartRouter=express.Router()

cartRouter.post('/get', authUser, getusercart)
cartRouter.post('/update', authUser, updatecart)
cartRouter.post('/add', authUser, addtocart)

export default cartRouter;
