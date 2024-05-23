import React, { useEffect, useState } from 'react'
import "./Comment.css"
import CommentForm from './CommentForm'

const Inomment = ({ postUser, comment, replies, backendComments, currUser, deleteComment, postId, setActiveCommment, activeComment, addComment }) => {

    const canReply = comment.parentId
    const fiveMinute = 300000

    const [timePassed, setTimePssed] = useState(false)

    useEffect(() => {
        setTimePssed((new Date() - new Date(comment.createdAt) > fiveMinute) && (new Date() - new Date(comment.createdAt) < Infinity))
    }, [comment]);


    const canEdit = currUser?._id === comment.userId
    const canDelete = currUser?._id === comment.userId

    const [hideReplyBox, setHideReplyBox] = useState(1)

    function myFunction() {
        setHideReplyBox((prev) => !prev)
    }

    // console.log("currUser._id ---> ", currUser._id, "comment.userId------> ", comment.userId)
    console.log(new Date() - new Date(comment.createdAt))

    const isReplying = activeComment && activeComment.type === "replying" && comment._id === activeComment.id

    const isEditing = activeComment && activeComment.type === "editing" && comment._id === activeComment.id



    const getReplies = (commentId) =>
        backendComments?.filter((backendComment) => backendComment.parentId === commentId)
            .sort(
                (a, b) =>
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );


    return (
        <div className='comment'>
            <div className="comment-image-container">
                <img src={comment.userImage ? process.env.REACT_APP_PUBLIC_FOLDER + comment.userImage : "http://cdn.onlinewebfonts.com/svg/img_569204.png"} />
            </div>

            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.userName}</div>
                    <div>{new Date(comment.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="comment-text">{comment.message}</div>


                <div className="comment-actions">
                    {canReply && (
                        <div
                            className="comment-actions"
                            style={{ paddingRight: "10px" }}
                            onClick={() => {
                                setActiveCommment({ id: comment._id, type: "replying" });
                                myFunction();
                            }}
                        >
                            Reply
                        </div>
                    )}


                    {canEdit && <div className="comment-actions" style={{ paddingRight: "10px" }}
                        onClick={() => setActiveCommment({ id: comment._id, type: "editing" })}
                    >Edit</div>}


                    {canDelete && <div className="comment-actions" onClick={() => deleteComment(comment._id, currUser, postId)}>Delete</div>}

                    <div className="style-reply">
                        {
                            isReplying && hideReplyBox == false && (
                                <CommentForm parrentId={comment._id} hideReplyBox={hideReplyBox} setHideReplyBox={setHideReplyBox} markReply={true} submitLabel="Reply"
                                    commentId={comment._id} currUser={currUser} postId={postId} handleSubmit={addComment} />
                            )
                        }
                    </div>
                </div>

                {Array.isArray(replies) && replies.length > 0 && (
                    <div className="" style={{ marginTop: "20px" }}>
                        {replies.map((reply) => (
                            <Inomment
                                comment={reply}
                                key={reply._id}
                                replies={getReplies(reply._id)}
                                postUser={postUser}
                                currUser={currUser}
                                backendComments={backendComments}
                                deleteComment={deleteComment}
                                postId={postId}
                                addComment={addComment}
                                setActiveCommment={setActiveCommment}
                                activeComment={activeComment}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Inomment
