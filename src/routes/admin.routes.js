import { Router } from "express";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
import { isAdmin } from "../middlewares/Admin.middleware.js";
import { getAllUsers } from "../controllers/admin.controllers.js";

const router = Router();

router.route('/allUsers').get(verifyJWT, isAdmin, getAllUsers)



export default router;