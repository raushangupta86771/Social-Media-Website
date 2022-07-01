import {React, useState} from 'react'
import { TrendData } from '../../../Data/TrendData'
import "./TrendCard.css"
import ShareModal from "../../Share modal/ShareModal"

const TrendCard = () => {
  const [modalOpened,setModalopend]=useState(false);

  return (
    <div className='TrendCard'>
        <h3>Trends For You</h3>
        {TrendData.map((data,id)=>{
            return(
                <div className='trend'>
                    <span><b>#{data.name}</b></span>
                    <span>{data.shares}k shares</span>
                </div>
            )
        })}

        <button onClick={()=>setModalopend(true)} className="share button">Share</button>
        <ShareModal modalOpened={modalOpened} setModalopend={setModalopend}/>
    </div>
  )
}

export default TrendCard