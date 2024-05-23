import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        desc: {
            type: String
        },
        likes: [],
        image: {
            type: String
        },
        name: {
            type: String
        },
        comment: [
            {
                userId: {
                    type: String,
                },
                parentId: {
                    type: String
                },
                message: {
                    type: String
                },
                userName: {
                    type: String
                },
                userImage: {
                    type: String
                },
                createdAt: {
                    type: Date,
                    default: Date.now()
                }
            },
        ]
    },
    { timestamps: true } //it will add 2 fiels "created at" and "updated at" in database so no need for doing manually
)

const PostModel = mongoose.model("Posts", PostSchema);
export default PostModel;
