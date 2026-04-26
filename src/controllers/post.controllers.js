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

const getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        .populate('author','name')

        if(!post) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        return res.status(200).json({
            message: 'Post fetch successfully',
            data: post
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error while getting post'
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const key = Object.keys(req.body);

        const allowedFields = ['title','content'];

        const validFields = key.every((field) => allowedFields.includes(field))

        if(!validFields) {
            return res.status(401).json({
                message: 'These fields cannot be updated'
            })
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'You are not allowed to update this post'
            });
        }


        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('author','name')



        return res.status(200).json({
            message: 'post updated successfully',
            data: updatedPost
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error while updating post'
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post) {
            return res.status(404).json({
                message: 'No post found'
            })
        }

        if(post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'You cannot delete this post'
            })
        }

        const deletedPost = await Post.findByIdAndDelete(req.params.id)

        if(!deletedPost) {
            return res.status(500).json({
                message: 'Something went wrong while deleting post'
            })
        }

        return res.status(200).json({
            message: 'Post deleted Successfully'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server error while deleting post'
        })
    }
}



export { createPost, getAllPosts, getSinglePost, updatePost, deletePost }