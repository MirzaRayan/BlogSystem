import { User } from "../models/User.models.js";
import bcrypt from 'bcrypt'


const methodToGenerateAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        return accessToken
    } catch (error) {
        console.log('Error while generating accessToken',error);
    }
}

const options = {
    httpOnly: true,
    secure: false,
}


const registerUser = async (req, res) => {
  try {

    const { name, email, password, bio } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.status(400).json({
        message: "User with same email already exists",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      bio
    });

    const createdUser = await User.findById(newUser._id).select("-password");

    if (!createdUser) {
      return res.status(500).json({
        message: "Something went wrong while creating user",
      });
    }

    return res.status(201).json({
      message: "User created successfully",
      data: createdUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error while registering user",
    });
  }
};

const loginUser = async (req, res) => {
    try {
        
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(401).json({
                message: 'All fields are required',
            })
        }

        const user = await User.findOne({
            email,
        })

        if(!user) {
            return res.status(404).json({
                message: 'User with this email does not exists'
            })
        }

        if (user.isBlocked) {
            return res.status(403).json({
              message: "User is blocked",
            });
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password)

        if(!isPasswordCorrect) {
            return res.status(400).json({
                message: 'Password is incorrect'
            })
        }

       

        const accessToken = await methodToGenerateAccessToken(user._id)

        const loggedInUser = await User.findById(user._id).select('-password')

        return res.status(200)
        .cookie('accessToken', accessToken, options)
        .json({
            message: 'User loggedIn successfully',
            data: loggedInUser,
            accessToken: accessToken,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error while loggingIn User',
        })
    }
}

const logoutUser = async (req, res) => {
    try {

        if(!req.user) {
            return res.status(401).json({
                message: 'unAuthorized Req'
            })
        }

        return res.status(200)
        .clearCookie('accessToken')
        .json({
            message: 'User loggedOut successfully',
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error while logging out User'
        })
    }
}

const getUserData = async (req, res) => {
    try {
        if(!req.user) {
            return res.status(401).json({
                message: 'UnAuthorized Req'
            })
        }

        return res.status(200).json({
            message: 'LoggedIn User data fetched Successfully',
            data: req.user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error while getting loggedIn User data'
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const keys = Object.keys(req.body);
        const allowedFields = ['name', 'email', 'bio'];

        const isValid = keys.every((field) => allowedFields.includes(field));

        if (!isValid) {
            return res.status(400).json({
                message: 'You cannot update this field'
            });
        }

        if (req.body.email) {
            const existedUser = await User.findOne({
                email: req.body.email,
                _id: { $ne: req.user._id } // exclude current user from check
            });

            if (existedUser) {
                return res.status(400).json({
                    message: 'User with same email already exists'
                });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            req.body,
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error while updating User data'
        });
    }
}

const deleteUser = async (req, res) => {
    try {        
        const deletedUser = await User.findByIdAndDelete(req.user._id)    

        if(!deletedUser) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        return res.status(200)
        .clearCookie('accessToken')
        .json({
            message: 'User deleted successfully',
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error while deleting User',
        })
        
    }
}

const changePassword = async (req, res) => {
    try {
        const {oldPassword, newPassword} = req.body;

        if(!oldPassword || !newPassword) {
            return res.status(400).json({
                message: 'All fields are required',
            })
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
              message: "Password must be at least 6 characters"
            });
          }


        if( oldPassword === newPassword ) {
            return res.status(401).json({
                message: 'New Password cannot be same as the previous one',
            })
        }

        const user = await User.findById(req.user._id)

        if(!user) {
            return res.status(404).json({
                message: 'User not found!'
            })
        }

        const isMatched = await bcrypt.compare(oldPassword, user.password)

        if(!isMatched) {
            return res.status(401).json({
                message: 'password does not match'
            })
        }

        user.password = newPassword
        
        await user.save();

        return res.status(200)
        .clearCookie('accessToken')
        .json({
            message: 'Password changed successfully',
        })


    } catch (error) {
        console.log('Server Error while changing password',error);
        return res.status(500).json({
            message: 'Server Error while changing password'
        })
    }
}

export { registerUser, loginUser, logoutUser, getUserData, updateUser, deleteUser, changePassword };
