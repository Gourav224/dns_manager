import { asyncHandler } from "../utils/asyncHandlers.js";
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const generateRefreshAndAccessToken = async (userId) => {
    try {
        let user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        user = await User.findById(userId);
        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // get user deatils form frontend
    // validation - notempty
    // check if user already exists : username
    // create user object - create  entery in db
    // remove pass word and refresh token field form resprose
    // check for user creation
    // return res
    const { email, fullName, password } = req.body;


    if (
        [fullName, email, password].some((field) => {
            return field?.trim() === "";
        })
    ) {
        throw new ApiError(400, 'All fields are required');
    }

    const existedUser = await User.findOne({email});
    if (existedUser) {
        throw new ApiError(409, "User with email already exists");
    }
    const user = await User.create({
        fullName,
        password,
        email,
    });

    const userCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!userCreated) {
        throw new ApiError(500, "Something went wrong when creating the user ");
    }
    return res.status(201).json(
        new ApiResponse(200, userCreated, "user created Sucessfully")
    );
})


const loginUser = asyncHandler(async (req, res) => {
    // req body -> data
    // email
    // find the user
    // password check
    // access and refresh tokenF
    // send cookie 
    // send res


    const { email, password } = req.body;
    // console.log(email, password);
    if (!email) {
        throw new ApiError(400, " email is Required");
    }
    if (!password) {
        throw new ApiError(400, "Password  is Required");
    }

    const user = await User.findOne({email});

    if (!user) {
        throw new ApiError(404, "user does not exist");
    }

    const isPasswordvalid = await user.isPasswordCorrect(password);

    if (!isPasswordvalid) {
        throw new ApiError(401, "Invalid user password");
    }
    const { accessToken, refreshToken } = await generateRefreshAndAccessToken(user._id);


    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    const options = {
        httpOnly: true,
        secure: true,

    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in Successfully"
            )
        );
})

const logoutUser = asyncHandler(async (req, res) => {
    User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "User logged out Successfully")
        )
})




const getCurrrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200, {
            user: req.body,
        },
            "Current user fetched sucessfully"
        )
    )
})


export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrrentUser
}