import React from 'react'
import FollowersCard from '../followers Card/FollowersCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import PostShare from '../PostSide/PostShare/PostShare'
import ProfileCard from '../profileCard/ProfileCard'

const ProfileSide = () => {
  return (
    <div className='ProfileSide'>
      <PostShare />
      {/* <LogoSearch/> */}
      <ProfileCard location="homepage" />
      {/* <FollowersCard/> */}
    </div>
  )
}

export default ProfileSide