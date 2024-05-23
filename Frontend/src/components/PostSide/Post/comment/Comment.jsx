import React from 'react'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import CommentForm from './CommentForm';
import Inomment from './Inomment';
import "./Comment.css"

const Comment = ({ data, postUser }) => {
    const [backendComments, setBackendComments] = useState([]);
    const [upTT, setupTT] = useState(0);
    const { user } = useSelector((state) => state.authReducer.authData);
    const { deviceToken } = useSelector((state) => state.authReducer);

    const [activeComment, setActiveCommment] = useState(null)

    // console.log(user)

    const rootComments = backendComments?.filter(
        (backendComment) => backendComment.parentId === "null"
    );

    const getReplies = (commentId) =>
        backendComments
            .filter((backendComment) => backendComment.parentId === commentId)
            .sort(
                (a, b) =>
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );


    // console.log(rootComments)




    useEffect(() => {
        axios
            .get(`http://localhost:5000/CommentRoute/getComment/${data._id}`)
            .then(response => {
                setBackendComments(response.data.comment);
            })
            .catch(error => {
                console.log(error);
            });
    }, [upTT]);

    const deleteComment = (commentId, currUserId, postId) => {
        if (window.confirm('Are you sure want to delete the comment ? ')) {
            console.log(postId)
            const requestBody = {
                commentId: commentId,
                currUserId: currUserId,
                postId: postId,
            };
            axios
                .delete(`http://localhost:5000/CommentRoute/deleteComment`, {
                    data: requestBody
                })
                .then(response => {
                    // Update the state variable by appending the new comment to it
                    setupTT((pre) => pre + 1)
                    setBackendComments([...backendComments, response.data.comment]);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }


    const addComment = (text, parentId, user, postId) => {
        const requestBody = {
            postId: postId,
            userId: user._id,
            parentId: parentId,
            message: text,
            userName: user.username,
            userImage: user.profilePicture && user.profilePicture,
            deviceToken,
            sender_image:user.profilePicture
        };
        axios
            .put(`http://localhost:5000/CommentRoute/postComment`, requestBody)
            .then(response => {
                // Update the state variable by appending the new comment to it
                setupTT((pre) => pre + 1)
                setBackendComments([...backendComments, response.data.comment]);
            })
            .catch(error => {
                console.log(error);
            });
    }



    return (
        <div className="comments my-3">
            <h3 className="comments-title">Comments</h3>
            <div className="comment-form-title">Write comment</div>

            <CommentForm submitLabel="Write" setHideReplyBox hideReplyBox markReply={false} parrentId handleSubmit={addComment} postId={data._id} />


            <div className="comments-container">
                {
                    rootComments?.map((ele) => {
                        return <Inomment
                            key={ele._id}
                            comment={ele}
                            postUser={postUser}
                            replies={getReplies(ele._id)}
                            backendComments={backendComments}
                            deleteComment={deleteComment}
                            postId={data._id}
                            activeComment={activeComment}
                            setActiveCommment={setActiveCommment}
                            currUser={user}
                            addComment={addComment}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default Comment