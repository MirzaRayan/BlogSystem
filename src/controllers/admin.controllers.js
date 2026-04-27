import { User } from "../models/User.models.js";


const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find().select('-password')

        if(!allUsers) {
            return res.status(404).json({
                message: 'No users found'
            })
        }

        return res.status(200).json({
            message: 'Users data fetched successfully',
            data: allUsers
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error while getting all users',
        })
    }
}

const getSingleUser = async (req, res) => {
    try {

        const user  = await User.findById(req.params.id).select('-password')

        if(!user) {
            return res.status(404).json({
                message: 'User Not found'
            })
        }

        return res.status(200).json({
            message: 'single User data fetched successfully',
            data: user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error while getting single user'
        })
        
    }
}

const deleteSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        if(user.role === "admin") {
            return res.status(403).json({
                message: 'You cannot delete an admin'
            })
        }
        
        await User.findByIdAndDelete(user._id);


        return res.status(200).json({
            message: 'User deleted Successfully'
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error while deleting User'
        })
        
    }
}

const blockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')


        if(!user) {
            return res.status(404).json({
                message: 'User Not found'
            })
        }

        if(user.role === "admin") {
            return res.status(403).json({
                message: 'You cannot block an admin',
            })
        }

        if(user.isBlocked) {
            return res.status(400).json({
                message: 'User is already blocked'
            })
        }

        user.isBlocked = true;

        await user.save();

        return res.status(200).json({
            message: 'User is blocked Successfully',
            data: user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error while blocking user'
        })
    }
}

const unBlockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')

        if(!user) {
            return res.status(404).json({
                message: 'User not found',
            })
        }

        if (user.role === "admin") {
            return res.status(403).json({
              message: "You cannot modify admin status",
            });
          }

        if(!user.isBlocked) {
            return res.status(400).json({
                message: 'User is already unblocked'
            })
        }

        user.isBlocked = false;

        await user.save();

        return res.status(200).json({
            message: 'User unblocked Successfully',
            data: user
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error while unblocking User'
        })
    }
}

const promoteToAdmin = async (req, res) => {
    try {

        const user = await User.findById(req.params.id).select('-password')

        if(!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        if(user.role === 'admin') {
            return res.status(400).json({
                message: 'User is already admin'
            })
        }

        if(user.isBlocked) {
            return res.status(400).json({
                message: 'Blocked User cannot become an admin.First Unbock the user'
            })
        }

        user.role = 'admin'

        await user.save();

        return res.status(200).json({
            message: 'User promoted to admin Successfully',
            data: user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error while promoting to admin'
        })
    }
}


export { getAllUsers, getSingleUser, deleteSingleUser, blockUser, unBlockUser, promoteToAdmin }