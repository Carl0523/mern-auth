import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user / Set token
// @route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (request, response) => {
  const {email, password} = request.body; //Fetch email and password from request body
  const user = await User.findOne({email});

  if (user && (await user.isPasswordMatched(password)) )
  {
    generateToken(response, user._id)
    response.status(201).json({
      _id:user._id,
      name:user.name,
      email:user.email,
    })
  }
  else
  {
    response.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (request, response) => {
  const { name, email, password } = request.body;

  const existUser = await User.findOne({ email }); //check if email existed

  if (existUser) {
    response.status(400);
    throw new Error("Email already existed");
  }
  const user = await User.create({ name, email, password });

  if (user)
  {
    generateToken(response, user._id)
    response.status(201).json({
        _id:user._id,
        name: user.name,
        email: user.email,
    });
  }
  else
  {
    response.status(400);
    throw new Error("Invalid user info")
  }
});

// @desc logout an user
// @route POST /api/users
// @access Public
const logoutUser = asyncHandler(async (request, response) => {
  response.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  response.status(200).json({ message: "User logout" });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (request, response) => {
  const userInfo = {
    _id: request.user._id,
    name: request.user.name,
    email: request.user.email,
  }
  response.status(200).json(userInfo);
});

// @desc Get user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (request, response) => {

  //Find the user info by searching userID
  const user = await User.findById(request.user._id);

  if (user)
  {
    user.name = request.body.name || user.name;
    user.email = request.body.email || user.email;
    if (request.body.password)
    {
      user.password = request.body.password
    }

    const updatedUser = await user.save();

    response.status(200).json(
      {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email
      }
    )
  }
  else
  {
    response.status(404);
    throw new Error("User not found")
  }
});

// POST -- /api/users -- Register a user
// POST -- /api/users/auth -- Authenticate the user and get token
// POST -- /api/users/logout -- logout the user and clear cookie
// GET -- /api/users/profile -- get the user profile
// PUT -- /api/users/profile -- update the user profile

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
