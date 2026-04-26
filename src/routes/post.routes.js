import { Router } from "express";
import { verifyJWT } from '../middlewares/Auth.middleware.js'
import { createPost, getAllPosts, getSinglePost, updatePost } from "../controllers/post.controllers.js";

const router = Router()

router.route('/create').post(verifyJWT, createPost)
router.route('/all').get(verifyJWT, getAllPosts)
router.route('/getPost/:id').get(verifyJWT, getSinglePost)
router.route('/updatePost/:id').put(verifyJWT, updatePost)

export default router