import { Router } from "express";
import { verifyJWT } from '../middlewares/Auth.middleware.js'
import { createPost, getAllPosts, getSinglePost } from "../controllers/post.controllers.js";

const router = Router()

router.route('/create').post(verifyJWT, createPost)
router.route('/all').get(verifyJWT, getAllPosts)
router.route('/:id').get(verifyJWT, getSinglePost)

export default router