import { Router } from "express";
import { deleteUser, getUserData, loginUser, logoutUser, registerUser, updateUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
const router = Router();


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

// protected routes

router.route('/logout').get(verifyJWT, logoutUser)
router.route('/me').get(verifyJWT, getUserData)
router.route('/update').put(verifyJWT, updateUser)
router.route('/delete').delete(verifyJWT, deleteUser)



export default router