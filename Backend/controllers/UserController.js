import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

//get user from database
export const getUser = async (req, res) => {
    const id = req.params.id;
    //first we will send the id of user whenever he will need for getUser request the we will fetch here.. abhi fetch kar rhe yaha

    try {
        const user = await userModel.findById(id);
        if (user) {
            const { password, ...otherDetails } = user._doc; //receiveing everything other than password
            res.status(200).json(otherDetails);
        }
        else {
            res.status(400).json({ msg: "user not found" });
        }
    } catch (error) {
        console.log("error in UserController.js");
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//get all user from database
export const getAllUser = async (req, res) => {

    try {
        let users = await userModel.find(); //it will give only results of first 20 documents

        //rcving all users execpt password
        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc;
            return otherDetails;
        })
        res.status(200).json(users);

    } catch (error) {
        console.log("error in UserController.js");
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


// update a user
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { _id, currentUserAdminStatus, password } = req.body;

    if (id === _id || currentUserAdminStatus) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }

            const user = await userModel.findByIdAndUpdate(id, req.body, {
                new: true,
            });

            const token = jwt.sign(
                {
                    username: user.username,
                    id: user._id
                },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            )

            res.status(200).json({ user, token });
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("Access Denied! you can only update your own profile");
    }
};


// Delete user
export const deleteUser = async (req, res) => {
    const id = req.params.id;

    const { currentUserId, currentUserAdminStatus } = req.body;

    if (currentUserId === id || currentUserAdminStatus) {
        try {
            await userModel.findByIdAndDelete(id);
            res.status(200).json("User deleted successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("Access Denied! you can only delete your own profile");
    }
};



//follow part
export const followUser = async (req, res) => {
    const id = req.params.id; //user ka hai jisko follow karna hai
    const _id = req.body._id; //uss user ka hai jo follow karega kisi aur ko
    console.log(id);
    if (_id === id) {
        res.status(403).json("application forbidden");
    }
    else {
        try {
            //followers,following have already defined as an array format in database model
            const followUser = await userModel.findById(id); //this is the user whom we wants to follow
            const followingUser = await userModel.findById(_id); //jo follow karna chahta hai
            if (!followUser.followers.includes(_id)) //checking whether already following aur not
            {
                await followUser.updateOne({ $push: { followers: _id } }); //whoever we want to follow. just pushing our id inside their follower list (followers list me)
                await followingUser.updateOne({ $push: { following: id } }); //apne under uska id push kar rhe jisko follow kar rhe (followings list me)
                console.log(followingUser);
                res.status(200).json("User followed!");
            }
            else {
                res.status(403).json("User is Already followed by you");
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    }
}


//follow part
export const UnfollowUser = async (req, res) => {
    const id = req.params.id; //user ka hai jisko unfollow karna hai
    const currentUserId = req.body._id; //uss user ka hai jo unfollow karega kisi aur ko
    if (currentUserId === id) {
        res.status(403).json("application forbidden");
    }
    else {
        try {
            //followers,following have already defined as an array format in database model
            const followUser = await userModel.findById(id); //this is the user whom we wants to unfollow
            const followingUser = await userModel.findById(currentUserId); //jo unfollow karna chahta hai
            if (followUser.followers.includes(currentUserId)) //checking whether already following aur not
            {
                await followUser.updateOne({ $pull: { followers: currentUserId } }); //whoever we want to follow. just pushing our id inside their follower list (followers list me)
                await followingUser.updateOne({ $pull: { following: id } }); //apne under uska id push kar rhe jisko follow kar rhe (followings list me)
                res.status(200).json("User unfollowed by you");
            }
            else {
                res.status(403).json("User is never followed by you");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}



