import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        deviceToken: [],
        Notification: [
            {
                NotificationId: {
                    type: String,
                    required: true
                },
                sender_id: {
                    type: String,
                },
                reciever_id: {
                    type: String
                },
                sender_name: {
                    type: String
                },
                reciever_name: {
                    type: String
                },
                title: {
                    type: String
                },
                msg: {
                    type: String
                },
                sender_image:{
                    type:String
                },
                isSeen: {
                    type: Boolean,
                    default: false
                },
                createdAt: {
                    type: Date,
                    default: Date.now()
                },
                updatedAt: {
                    type: Date,
                    default: Date.now()
                }
            },
        ]
    },
    { timestamps: true }
);

NotificationSchema.pre("save", async function (next) {
    const doc = this;
    if (doc.isNew) {
        const count = await doc.constructor.countDocuments();
        doc.NotificationId = count + 1;
    }
    next();
});

const NotificationModel = mongoose.model("Notifications", NotificationSchema);
export default NotificationModel;
