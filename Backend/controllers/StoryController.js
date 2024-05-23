//in last request we are working with two databases table
import StorySchema from "../models/StoryModel.js"
import userModel from "../models/userModel.js";
import mongoose from "mongoose";

// Creat new Post
export const createStory = async (req, res) => {
    try {
        const { userId, image, duration, username, userImage, caption } = req.body;
        const story = new StorySchema({ userId, image, duration, username, userImage, caption });
        await story.save();
        res.status(201).json(story);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

//get stories of user
export const getStories = async (req, res) => {
    try {
        const { userId } = req.params;
        // console.log(req.body)
        const followersAndFollowing = await userModel.findById(userId);
        const allFollowersandFollowings = followersAndFollowing.followers.concat(followersAndFollowing.following);
        const storiesFeed = await StorySchema.find({
            userId: { $in: allFollowersandFollowings }
        });
        res.status(201).json(storiesFeed);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}




//insert user views
export const insertUserViewId = async (req, res) => {
    try {
        const { userId, storyId } = req.body;
        const story = await StorySchema.findById(storyId);
        // console.log(story)
        if (!story.viewers?.includes(userId)) {
            // StorySchema.sessions.createIndex()
            const resPond = await story.updateOne({ $push: { viewers: userId } });
            res.status(200).json({ resPond, status: true });
        }
        else {
            res.status(500).json({ status: false });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}
