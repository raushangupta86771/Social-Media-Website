import React, { useState, useEffect } from "react";
import "./Post.css";
import Comment from "./comment/Comment";
import Share from "../../../img/share.png";
import Heart from "../../../img/like.png";
import NotLike from "../../../img/notlike.png";
import { likePost } from "../../../api/LikePost";
import { useSelector } from "react-redux";
import axios from "axios";

const Post = ({ data }) => {
  console.log(data);
  const { user } = useSelector((state) => state.authReducer.authData);
  const { deviceToken } = useSelector((state) => state.authReducer);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const [showComment, setShowComment] = useState(false)

  useEffect(() => {
    axios
      // .get(`https://social-media-73bn.onrender.com/post/${data._id}`)
      .get(`http://localhost:5000/post/${data._id}`)
      .then(response => {
        console.log(response.data.likes);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  const handleLike = () => {
    console.log("deviceToken - ", deviceToken)
    let sender_image=user.profilePicture
    likePost(data._id, user._id, deviceToken,sender_image);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  };
  const handleComment = () => {
    setShowComment((prev) => !prev);
  };
  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="postReact">
        <img className="like-unlike"
          src={liked ? Heart : "https://icons-for-free.com/iconfiles/png/512/heart-131965017458786724.png"}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img className="like-unlike"
          src="https://icon-library.com/images/comment-icon-png/comment-icon-png-7.jpg"
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleComment}
        />
        {/* <img src={Comment} alt="" />
        <img src={Share} alt="" /> */}
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
      {
        showComment && <Comment data={data} postUser={user} />
      }
    </div>
  );
};

export default Post;