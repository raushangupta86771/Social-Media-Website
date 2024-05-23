import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import InfoCard from './InfoCard/InfoCard'
import FollowersCard from "../followers Card/FollowersCard"

const ProfileLeft = () => {
  return (
    <div className='ProfileLeft'>
      {/* <LogoSearch/> */}
      <InfoCard/>
      {/* <FollowersCard/> */}
    </div>
  )
}

export default ProfileLeft