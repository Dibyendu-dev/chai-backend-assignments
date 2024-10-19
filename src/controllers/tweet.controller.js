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
    //Get the user ID from the request params
    //Validate userId
    //get user tweets from DB
    //Respond with the user tweets

    // const userId = req.params.userId;
       const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID.");
    }

    const tweet = await Tweet.find({
        owner: userId
    });

    if (!tweet) {
        throw new ApiError(404, "No tweets found.");
    }

    res.status(200).json({
        success: true,
        message: "Tweets fetched successfully.",
        data: tweet 
    })


})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    // Get the tweet ID from req.params and the updated content from req.body.
    // Validate the tweet ID and the updated content.
    // Find the tweet in the database.
    // Update the tweet in the database.
    // Respond with the updated tweet.

    const { tweetId } = req.params;
    const { content } = req.body;    

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID.");
    }

    if (!content || content.trim() === "") {
        throw new ApiError(400, "Tweet content is required.");
    }

    // const tweet = await Tweet.findById(tweetId);
    // if (!tweet) {
    //     throw new ApiError(404, "Tweet not found.");    
    // }

    // tweet.content = content;
    // await tweet.save();

    const tweet = await Tweet.findByIdAndUpdate(tweetId, {
        content
    }, {
        new: true
    });

    if (!tweet) {
        throw new ApiError(404, "Tweet not found.");
    }

    res.status(200).json({
        success: true,
        message: "Tweet updated successfully.",
        data: tweet
    })
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    //Get the tweet ID from req.params.
    //Validate the tweet ID.
    //Find the tweet in the database.
    //Delete the tweet from the database.
    //Respond with a success message.

    const { tweetId } = req.params;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID.");    
    }

    const tweet = await Tweet.findByIdAndDelete(tweetId);
    if (!tweet) {
        throw new ApiError(404, "Tweet not found.");
    }

    res.status(200).json({
        success: true,
        message: "Tweet deleted successfully.",
        data: tweet
    })
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
