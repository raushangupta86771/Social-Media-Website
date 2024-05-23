import React from 'react'
import ProfileCard from "../profileCard/ProfileCard"
import PostSide from "../PostSide/PostSide"
import "./ProfileCenter.css"

const ProfileCenter = () => {
  return (
    <div className='ProfileCenter visi-adj-profile-center'>
        <ProfileCard location="profilePage"/>
        
        <PostSide/>
    </div>
  )
}

export default ProfileCenter