import { Router } from "express";
import { getUserData, loginUser, logoutUser, registerUser, updateUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
const router = Router();


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

// protected routes

router.route('/logout').get(verifyJWT, logoutUser)
router.route('/me').get(verifyJWT, getUserData)
router.route('/update').put(verifyJWT, updateUser)



export default router