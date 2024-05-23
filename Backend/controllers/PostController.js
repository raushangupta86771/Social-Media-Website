//in last request we are working with two databases table
import PostModel from "../models/PostModel.js"
import userModel from "../models/userModel.js";
import NotificationModel from "../models/NotificationModel.js";
import mongoose from "mongoose";
import FCM from "fcm-node";
import fs from "fs"
import path from "path";
import { pushNotification } from "../common/sendNotification.js";

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
    // console.log('hello')

    try {
        const post = await PostModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        console.log(error)
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

const addNotification = async (notiId, sender_id, reciever_id, sender_name, title, msg, deviceToken,sender_image) => {
    console.log("sender id - ", sender_id)
    console.log("rcvr id - ", reciever_id)
    return new Promise((resolve, reject) => {
        NotificationModel.find({ userId: reciever_id }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result)
            }
        })
    })
        .then((res) => {
            if (res.length < 1) {
                let tokenArray = [];
                tokenArray.push(deviceToken)
                const notiObject = new NotificationModel({
                    userId: reciever_id,
                    deviceToken: tokenArray,
                    Notification: [
                        {
                            NotificationId: notiId,
                            sender_id,
                            reciever_id,
                            sender_name,
                            title,
                            msg,
                            sender_image
                        }
                    ]
                })
                return notiObject.save()
                    .then((savedObject) => {
                        console.log('Object saved:', savedObject);
                        pushNotification(reciever_id,msg,title);
                        return true;
                    })
                    .catch((error) => {
                        console.log('Error saving object:', error);
                        return false;
                    });
            }
            else {
                let tokens = res[0].deviceToken;
                if (!tokens.includes(deviceToken)) {
                    tokens.push(deviceToken);
                    console.log("yes -- ", tokens);
                }

                return NotificationModel.updateOne(
                    { userId: reciever_id },
                    {
                        $push: {
                            Notification: {
                                NotificationId: notiId,
                                sender_id,
                                reciever_id,
                                sender_name,
                                title,
                                msg,
                                sender_image
                            },
                        },
                        $set: { deviceToken: tokens },
                    }
                )
                    .then((res) => {
                        pushNotification(reciever_id,msg,title);
                        console.log("Notification added - ", res);
                        return true;
                    })
                    .catch((error) => {
                        console.log("Error found while adding notification - ", error);
                        return false;
                    });
            }
        })
        .catch((error) => {
            console.log('error is here - ', error);
        });
}



// like/dislike a post
export const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId, deviceToken ,sender_image} = req.body;

    console.log("deviceToken - ",deviceToken)

    try {
        const post = await PostModel.findById(id);
        if (!post.likes.includes(userId)) {
            post.updateOne({ $push: { likes: userId } })
                .then(async (result) => {
                    userModel.findById(userId)
                        .then(async (data) => {
                            let notiId = `${userId}${id}${(new Date()).getTime() / 1000}`
                            let notiTitle = `${data.firstname} liked your post`;
                            let notiMsg = `${data.firstname} has reacted to your recent post`;
                            const isSuccess = await addNotification(notiId, userId, post.userId, data.firstname, notiTitle, notiMsg, deviceToken,sender_image);
                            if (!isSuccess) {
                                return res.status(500).json(error);
                            }
                            return res.status(200).json("Post Liked");
                        })
                        .catch((error) => {
                            console.log(error)
                            return res.status(500).json(error);
                        })
                })
                .catch((error) => {
                    console.log("error is here - ", error)
                    return res.status(500).json(error);
                })
        }
        else {
            post.updateOne({ $pull: { likes: userId } })
                .then(async (result) => {
                    userModel.findById(userId)
                        .then(async (data) => {
                            let notiId = `${userId}${id}${(new Date()).getTime() / 1000}`
                            let notiTitle = `${data.firstname} unliked your post`;
                            let notiMsg = `${data.firstname} has reacted to your recent post`;
                            const isSuccess = await addNotification(notiId, userId, post.userId, data.firstname, notiTitle, notiMsg, deviceToken,sender_image);
                            if (!isSuccess) {
                                return res.status(500).json(error);
                            }
                            return res.status(200).json("Post unLiked");
                        })
                        .catch((error) => {
                            console.log("error is here - ", error)
                            return res.status(500).json(error);
                        })
                })
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const updateNotification = async (req, res) => {
    try {
        const { userId, NotificationIds } = req.body;
        //we will get array of NotificationId, because there might be more than 1 notification for making seen
        NotificationModel.find({ userId })
            .then(async (result) => {
                let notificationList = result[0].Notification;
                console.log("before seen notifications - ", notificationList);
                notificationList.forEach(element => {
                    if (NotificationIds.includes(element.NotificationId)) {
                        element.isSeen = true;
                    }
                });
                NotificationModel.updateOne({ userId },
                    { $set: { Notification: notificationList } }, { new: true })
                    .then((updated) => {
                        return res.status(200).json({ message: "Notification marked as seen" });
                    })
                    .catch((error) => {
                        console.log(error)
                        return res.status(500).json(error);
                    })
            })
            .catch((error) => {
                console.log(error)
                return res.status(500).json(error);
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}

//get notification by userId
export const getNotifications = async (req, res) => {
    try {
        NotificationModel.find({ userId: req.params.userId })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                console.log(error)
                return res.status(500).json(error);
            })
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

//post comment
export const postComment = async (req, res) => {
    const { postId, parentId, message, userName, userId, userImage, deviceToken,sender_image } = req.body;

    try {
        const post = await PostModel.findById(postId);
        if (post) {
            PostModel.updateOne(
                { _id: postId }, // Specify the ID of the post document to update
                {
                    $push: {
                        comment: {
                            userId: userId,
                            parentId: parentId,
                            message: message,
                            userName: userName,
                            userImage: userImage,
                        },
                    },
                }
            )
                .then(async (result) => {
                    let notiId = `${userId}${parentId}${(new Date()).getTime() / 1000}`
                    let notiTitle = `${userName} commented your post`;
                    let notiMsg = message;
                    const isSuccess = await addNotification(notiId, userId, post.userId, userName, notiTitle, notiMsg, deviceToken,sender_image);
                    if (isSuccess) {
                        const updatedPost = await PostModel.findById(postId);
                        return res.status(200).json(updatedPost);
                    }
                    return res.status(500).json({ message: "failed to send notification for add comment" });
                })
                .catch((error) => {
                    console.log(error)
                    return res.status(500).json(error);
                })
        } else {
            return res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};


//get comment
export const getComments = async (req, res) => {
    // console.log("hello")
    const { postId } = req.params;

    try {
        const post = await PostModel.findById(postId);
        if (post) {
            const sortedPost = post.comment.sort((a, b) => {
                return b.createdAt - a.createdAt
            })
            post.comment = sortedPost
            // console.log(sortedPost)
            res.status(200).json(post);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};



//delete a comment
export const deleteComment = async (req, res) => {
    const { commentId, currUserId, postId } = req.body;

    try {
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).send("Post not found");
        }
        const commentIdx = post.comment.findIndex((comment) => comment._id == commentId && comment.userId == currUserId._id)
        // console.log(req.body)
        if (commentIdx == -1) {
            return res.status(404).send("Comment not found or unauthorized");
        }
        post.comment.splice(commentIdx, 1);
        const resData = await post.save();
        res.status(200).send(resData);
    } catch (error) {
        console.log(error)
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
        res.status(200).json(currentUserPost.concat(...followingPosts[0].followingPosts).sort((a, b) => {
            return b.createdAt - a.createdAt;
        }));
    }
    catch (error) {
        res.status(500).json(error);
    }
}