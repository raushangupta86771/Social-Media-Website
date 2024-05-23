import React from 'react'
import "./SingleNotification.css"

const SingleNotification = ({ data }) => {

    function timeAgo(timestamp) {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);

        if (seconds < 60) {
            return `${seconds} seconds ago`;
        }

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `${minutes} minutes ago`;
        }

        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
            return `${hours} hours ago`;
        }

        const days = Math.floor(hours / 24);
        if (days < 30) {
            return `${days} days ago`;
        }

        const months = Math.floor(days / 30);
        if (months < 12) {
            return `${months} months ago`;
        }

        const years = Math.floor(months / 12);
        return `${years} years ago`;
    }

    return (
        <div className="notify_item">
            <div className="notify_img">
                <img src={data.sender_image ? process.env.REACT_APP_PUBLIC_FOLDER + data.sender_image : ""}
                    alt="" style={{ width: '50px', height:"50px" }} />
            </div>
            <div className="notify_info">
                <p>
                    {data.title}
                </p>
                <span className="notify_time">{timeAgo(new Date(data.updatedAt))}</span>
            </div>
        </div>
    )
}

export default SingleNotification