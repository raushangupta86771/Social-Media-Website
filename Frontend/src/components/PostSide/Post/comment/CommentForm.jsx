import React, { useState } from 'react'
import { useSelector } from "react-redux";
import axios from "axios";

const CommentForm = ({ handleSubmit, submitLabel, postId, setHideReplyBox, hideReplyBox, markReply, parrentId, currUser, commentId }) => {
    const [text, setText] = useState("")
    const { user } = useSelector((state) => state.authReducer.authData);

    const isTextAreaDisabled = text.length == 0;

    const onSubmit = (event) => {
        event.preventDefault();

        //this will work only for reply
        if (markReply == true) {
            handleSubmit(text, commentId, currUser, postId);
            setText("");
        }

        //this will work for 1st comment
        else {
            handleSubmit(text, "null", user, postId);
            setText("");
            // console.log("hello")
            setHideReplyBox((prev) => !prev)
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <textarea
                className="comment-form-textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button className="comment-form-button" disabled={isTextAreaDisabled}>
                {submitLabel}
            </button>

        </form>
    )
}

export default CommentForm