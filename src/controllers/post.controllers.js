import { Post } from "../models/Post.models.js";


const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if(!title || !content) {
            return res.status(401).json({
                message: 'All fields are required',
            })
        }

        const post = await Post.create({
            title,
            content,
            author:req.user._id,
        })

        if(!post) {
            return res.status(400).json({
                message: 'Something went wrong while creating post'
            })
        }

        return res.status(201).json({
            message: 'Post created successfully',
            data: post
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error while creating post'
        })
    }
}

const getAllPosts = async (req, res) => {
    try {

        const allPosts = await Post.find({
            author: req.user._id
        })

        if(allPosts.length === 0) {
            return res.status(404).json({
                message: 'No post found'
            })
        }

        return res.status(200).json({
            message: 'All posts fetched Successfully',
            data: allPosts
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error while getting all posts'
        })
    }
}




export { createPost, getAllPosts }