import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    //Extract tweet content
    //Validate tweet content:
    //Check if user exists
    //Create and save the tweet to DB
    //Respond with the created tweet

    const {content} = req.body

     // Validation - check if tweetContent is not empty
     if (!content || content.trim() === "") {
        throw new ApiError(400, "Tweet content is required.");
    }

    // Validation - check if user exists
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    // Create and save the tweet to DB    
    const tweet = await Tweet.create({
        content,
        owner: user._id
    })

    // Respond with the created tweet    
    res.status(201).json({
        success: true,
        message: "Tweet created successfully.",
        data: tweet,
    
    })
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
