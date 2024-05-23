import React from 'react'
import StorieMain from '../Stories/StorieMain'
import Posts from './Posts/Posts'
import PostShare from './PostShare/PostShare'
import "./PostSide.css"

const PostSide = () => {
  return (
    <div className='PostSide adj-visi-post'>
      {/* <PostShare/> */}
      <StorieMain />
      <Posts />
    </div>
  )
}

export default PostSide