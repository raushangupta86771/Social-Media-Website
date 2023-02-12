import React from 'react'
import Posts from './Posts/Posts'
import PostShare from './PostShare/PostShare'
import "./PostSide.css"

const PostSide = () => {
  return (
    <div className='PostSide adj-visi-post'>
        {/* <PostShare/> */}
        <Posts/>
    </div>
  )
}

export default PostSide