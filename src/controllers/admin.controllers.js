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



export { getAllUsers }