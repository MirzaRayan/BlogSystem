import { Router } from "express";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
import { isAdmin } from "../middlewares/Admin.middleware.js";
import { blockUser, promoteToAdmin, deleteSingleUser, getAllUsers, getSingleUser, unBlockUser, getAllStats, getAllPosts, getSinglePost, deleteSinglePost } from "../controllers/admin.controllers.js";

const router = Router();


// Protected Routes
router.route('/allUsers').get(verifyJWT, isAdmin, getAllUsers)
router.route('/getAllStats').get(verifyJWT, isAdmin, getAllStats)
router.route('/allPosts').get(verifyJWT, isAdmin, getAllPosts)
router.route('/getSinglePost/:id').get(verifyJWT, isAdmin, getSinglePost)
router.route('/deleteSinglePost/:id').delete(verifyJWT, isAdmin, deleteSinglePost)
router.route('/getSingleUser/:id').get(verifyJWT, isAdmin, getSingleUser)
router.route('/deleteSingleUser/:id').delete(verifyJWT, isAdmin, deleteSingleUser)
router.route('/block/:id').put(verifyJWT, isAdmin, blockUser)
router.route('/unblock/:id').put(verifyJWT, isAdmin, unBlockUser)
router.route('/promoteToAdmin/:id').put(verifyJWT, isAdmin, promoteToAdmin)



export default router;