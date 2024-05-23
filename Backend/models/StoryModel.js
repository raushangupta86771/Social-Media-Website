import mongoose from "mongoose";

const StorySchemaa = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        image: {
            type: String,
            // required: true
        },
        username: {
            type: String
        },
        userImage: {
            type: String
        },
        caption: {
            type: String,
        },
        duration: {
            type: Number,
            default: 1000 // in seconds
        },
        viewers: [],
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 86400
        }
    }
);

// create a TTL index on the createdAt field
StorySchemaa.index({ createdAt: 1 }, { expireAfterSeconds: '86400' });

const StorySchema = mongoose.model("Story", StorySchemaa);
export default StorySchema;
