import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler';

/**
 * Make sure some routes can only be access when authorized (logged in)
 */
const protect = asyncHandler(async (request, response, next) => {
    let token;
    token = request.cookies.jwt; //fetch parsed cookie data (token)

    if (token)
    {
        try{
            //if verified, decoded jwt payload will be return
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET)
            request.user = await User.findById(decodedPayload.userId).select('-password')
            next();
        }
        catch
        {
            response.status(401);
            throw new Error("Not authorized, invalid token")
        }
    }
    else
    {
        response.status(401);
        throw new Error("Not authorized, token does not exist")
    }
})


export {protect};