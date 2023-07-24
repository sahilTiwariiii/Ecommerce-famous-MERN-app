import express from 'express'
import {registerController,loginController,testController, forgotPasswordController, updateProfileController} from '../controller/authcontroller.js'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js'
// router object
const router =express.Router()
// routing
// REGISTER || METHOD POST
router.post('/register',registerController)
// LOGIN || POST
router.post('/login',loginController)
// forgot password || post
router.post('/forgot-password',forgotPasswordController)
// test route
router.get('/test',requireSignIn,isAdmin,testController)
// protected User route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})
// protected Admin route route auth
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})
// update prfoile
router.put('/profile',requireSignIn,updateProfileController)

export default router