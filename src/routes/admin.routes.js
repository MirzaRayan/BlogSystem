import { Router } from "express";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
import { isAdmin } from "../middlewares/Admin.middleware.js";
import { deleteSingleUser, getAllUsers, getSingleUser } from "../controllers/admin.controllers.js";

const router = Router();


// Protected Routes
router.route('/allUsers').get(verifyJWT, isAdmin, getAllUsers)
router.route('/:id').get(verifyJWT, isAdmin, getSingleUser)
router.route('/delete/:id').delete(verifyJWT, isAdmin, deleteSingleUser)



export default router;