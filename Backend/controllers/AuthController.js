import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


//registering a new user
export const registerUser = async (req, res) => {

    //hasging the user inputed password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password=hashedPass;

    const newUser = new userModel(req.body);
    const username=req.body.username;

    const oldUser = await userModel.findOne({username});
    if(oldUser)
    {
        return res.status(400).json({ message:"User is already exist" });
    }
    try {
        const user=await newUser.save();

        const token=jwt.sign({
            username:user.user,
            id:user._id,
        },process.env.JWT_KEY,{expiresIn:'1h'})

       res.status(200).json({user,token});
    } catch (error) {
        console.log("error in AuthController.js");
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


//login user
export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username: username });
        if (user) {
            const validate = await bcrypt.compare(password, user.password);
            if (validate) {
                const token=jwt.sign({
                    username:user.user,
                    id:user._id,
                },process.env.JWT_KEY,{expiresIn:'1h'})

                res.status(200).json({user,token});
            }
            else {
                res.status(400).json({ errMsg: "Invalid Credentials"})
            }
        }
        else
        {
            res.status(400).json({ errMsg: "User Not exist"})
        }
    }
    catch (error) {
        console.log("error in AuthController.js");
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}