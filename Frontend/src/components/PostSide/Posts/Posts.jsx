import { React, useEffect, useState } from 'react'
import "./Posts.css"
import { PostsData } from '../../../Data/PostsData'
import Post from '../Post/Post'
import { useSelector, useDispatch } from "react-redux"
import { getTimelinePosts } from "../../../actions/postAction.js"
import { getSinglePost } from '../../../actions/getSinglePost'
import { useParams } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars';
import axios from "axios";

const Posts = () => {
  const param = useParams();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts } = useSelector((state) => state.postReducer);
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/post/${user._id}/timeline`)
      .then(response => {
        console.log(`http://localhost:5000/post/${user._id}/timeline`)
        setPostsList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if (!posts) { return "No Posts" }
  console.log(typeof (posts))
  if (param.id) {
    posts = posts.filter((post) => post.userId === param.id);
  }

  return (
    <>
      <Scrollbars>
        <div className='Posts'>
          {postsList.map((post, id) => {
            return <Post data={post} id={id} />
          })}

        </div>
      </Scrollbars>
    </>
  )
}

export default Posts