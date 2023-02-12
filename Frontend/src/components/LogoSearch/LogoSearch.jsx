import React from 'react'
import Logo from "../../img/logo.png"
import { UilSearch } from '@iconscout/react-unicons'
import "./LogoSearch.css"

const LogoSearch = () => {
  return (
    <>
      <div className="LogoSearch">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Mastodon_logotype_%28simple%29_new_hue.svg/1200px-Mastodon_logotype_%28simple%29_new_hue.svg.png" className='logo-adj' alt="" />
        {/* <div className='Search'>
        <input type="text" placeholder='#explore' name="" id="" />
        <div className="searchicon">
          <UilSearch />
        </div>
      </div> */}
      </div>
    </>
  )
}

export default LogoSearch