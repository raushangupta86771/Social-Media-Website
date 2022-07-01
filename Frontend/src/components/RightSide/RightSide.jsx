import React from 'react'
import "./RightSide.css"
import home from "../../img/home.png"
import Noti from "../../img/noti.png"
import comment from "../../img/comment.png"
import { UilSetting } from '@iconscout/react-unicons'
import TrendCard from './trend card/TrendCard'
import { Link } from 'react-router-dom'

const RightSide = () => {
  return (
    <>
      <div className='RightSide'>
        <div className="navIcons">
          <Link to="../home"><img className='imgNav' src={home} alt="" /></Link>
          <img src={Noti} alt="" />
          <UilSetting />
          <img src={comment} alt="" />
        </div>
        <TrendCard />
      </div >
    </>
  )
}

export default RightSide