import React from 'react'
import "./home.css"
import ProfileSide from '../../components/profileside/ProfileSide'
import PostSide from '../../components/PostSide/PostSide'
import RightSide from '../../components/RightSide/RightSide'
import FollowersCard from '../../components/followers Card/FollowersCard'
import PostShare from '../../components/PostSide/PostShare/PostShare'

const Home = () => {
  return (
    <div className="Home">
      <ProfileSide />
      <PostSide />
      {/* <PostShare/> */}

      {/* <PostSide/> */}
      {/* <FollowersCard/> */}
      {/* <RightSide/> */}
    </div>
  )
}

export default Home