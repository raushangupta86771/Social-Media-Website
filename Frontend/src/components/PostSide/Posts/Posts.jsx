import { React, useEffect } from 'react'
import "./Posts.css"
import { PostsData } from '../../../Data/PostsData'
import Post from '../Post/Post'
import { useSelector, useDispatch } from "react-redux"
import { getTimelinePosts } from "../../../actions/postAction.js"
import { getSinglePost } from '../../../actions/getSinglePost'
import { useParams } from 'react-router-dom'

const Posts = () => {
  const param = useParams();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts }= useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [])

  if (!posts) { return "No Posts" }
  console.log(typeof (posts))
  if (param.id) {
    posts = posts.filter((post) => post.userId === param.id);
  }

  return (
    <div className='Posts'>
      {posts.map((post, id) => {
        return <Post data={post} id={id} />
      })}
    </div>
  )
}

export default Posts