import React from 'react'
import "./Profile.css"
import ProfileLeft from '../../components/profileLeft/ProfileLeft'
import ProfileCenter from '../../components/profile center/ProfileCenter'
import RightSide from "../../components/RightSide/RightSide"

const Profile = () => {
  return (
    <div className='Profile'>
        <ProfileLeft/>
        <ProfileCenter/>
        <RightSide/>
    </div>
  )
}

export default Profile