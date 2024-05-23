//in last request we are working with two databases table
import PostModel from "../models/PostModel.js"
import userModel from "../models/userModel.js";
import NotificationModel from "../models/NotificationModel.js";
import mongoose from "mongoose";


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

