import { Router } from "express";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
import { isAdmin } from "../middlewares/Admin.middleware.js";
import { blockUser, deleteSingleUser, getAllUsers, getSingleUser } from "../controllers/admin.controllers.js";

const router = Router();


// Protected Routes
router.route('/allUsers').get(verifyJWT, isAdmin, getAllUsers)
router.route('/:id').get(verifyJWT, isAdmin, getSingleUser)
router.route('/delete/:id').delete(verifyJWT, isAdmin, deleteSingleUser)
router.route('/block/:id').put(verifyJWT, isAdmin, blockUser)



export default router;