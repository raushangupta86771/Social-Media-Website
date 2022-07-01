import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        profilePicture:String,
        coverPicture:String,
        about:String,
        livesin:String,
        worksAt:String,
        relationship:String,
        country:String,
        followers:[],
        following:[]
    },
    {timestamps:true} //it will add 2 fiels "created at" and "updated at" in database so no need for doing manually
)

const userModel = mongoose.model("Users",userSchema);
export default userModel;
