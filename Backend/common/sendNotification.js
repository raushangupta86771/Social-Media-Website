import FCM from "fcm-node";
import fs from "fs"
import path from "path";
import NotificationModel from "../models/NotificationModel.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const pushNotification = async (userId, message, title) => {
    try {
        fs.readFile(path.join(__dirname, '../firebaseconfig.json'), "utf8", async (err, jsonString) => {
            if (err) {
                console.log("Error reading file from disk:", err);
                return err;
            }
            try {
                //firebase push notification send
                const data = JSON.parse(jsonString);
                var serverKey = data.server_key;
                var fcm = new FCM(serverKey);

                NotificationModel.find({ userId })
                    .then((result) => {
                        var deviceTokenList = result[0].deviceToken;
                        if (deviceTokenList.length > 0) {
                            var pushMessage = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                                registration_ids: deviceTokenList,
                                content_available: true,
                                mutable_content: true,
                                notification: {
                                    title,
                                    body: message,
                                    icon: 'https://upload.wikimedia.org/wikipedia/fr/a/a9/IChat.png',//Default Icon
                                    sound: 'mySound',//Default sound
                                    // badge: badgeCount, example:1 or 2 or 3 or etc....
                                },
                                // data: {
                                //   notification_type: 5,
                                //   conversation_id:inputs.user_id,
                                // }
                            };
                            fcm.send(pushMessage, function (err, response) {
                                if (err) {
                                    console.log("Something has gone wrong!", err);
                                } else {
                                    console.log("Push notification sent.", response);
                                }
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
            catch (err) {
                console.log("Error parsing JSON string:", err);
            }
        })

    } catch (error) {
        console.log(error);
    }
}