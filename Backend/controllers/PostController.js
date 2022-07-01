//in last request we are working with two databases table
import PostModel from "../models/PostModel.js"
import userModel from "../models/userModel.js";
import mongoose from "mongoose";

// Creat new Post
export const createPost = async (req, res) => {
    const newPost = new PostModel(req.body);

    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json(error);
    }
};



// Get a post

export const getPost = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await PostModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};


// Get a single post by its post id

export const getSinglePost = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await PostModel.findById(id);
        res.status(200).json(post.likes);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update a post
export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(postId);
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Post Updated");
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete a post
export const deletePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(id);
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("POst deleted successfully");
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};


// like/dislike a post
export const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(id);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json("Post liked");
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json("Post Unliked");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};


// Get Timeline POsts
//we will show both posts in timeline (itself post and the post of their whom user is following)
//warning!! this is some what tricky part so read it carefully, word by word, bcz with this you understand how to work with 2 different model/database/table(what ever you want to say)
export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id; //logged in user ka id
    try {
        const currentUserPost = await PostModel.find({ userId: userId }); //getting all the posts from "posts" table, because logged in user id is save as common in all posts with the field name of userId
        //aggregate is nothing but array of steps
        const followingPosts = await userModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId), //pahla step match karne ka hai jaha pe jo user id mere pass hai url me usko userModel ke _id se match karenge, _id string format me nhi hai isliye pahle use string format me convert kiye
                },
            },

            {
                $lookup: {
                    //iss step me hamlog kisi aur data base me rah ke dusre database me query execute karte (users me rah ke posts database me execute karenge)
                    from: "posts", //post field se
                    localField: "following", //hamare userModel me ek field hai following, jiske under userId bhare pare hai, ab iss userId ko jo following ke under hai usko posts database ke userId se match karna hai
                    foreignField: "userId",
                    as: "followingPosts", //followingPosts object me rcv karna chah rahe hai
                },
            },

            {
                $project: {
                    //this field is nothing but the return type of our query
                    followingPosts: 1,
                    _id: 0, //ye id bhi return karta hai, lekin usko abhi neglate kar rhe
                },
            }
        ])
        //below respone we are getting in array format
        res.status(200).json(currentUserPost.concat(...followingPosts[0].followingPosts).sort((a,b)=>{
            return b.createdAt - a.createdAt;
        }));
    }
    catch (error) {
        res.status(500).json(error);
    }
}