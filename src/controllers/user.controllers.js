import { User } from "../models/User.models.js";


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
    httpOnly: false,
    secure: true
}


const registerUser = async (req, res) => {
  try {
    console.log(req.body);

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

export { registerUser, loginUser };
