import { React, useEffect, useState } from 'react'
import "./InfoCard.css"
import { UilPen } from "@iconscout/react-unicons"
import ProfileModal from "../../profile Modal/ProfileModal"
import { useDispatch, useSelector } from 'react-redux'
import { Params, useParams } from 'react-router-dom'
import * as UserApi from "../../../api/UserRequest.js"
import { logout } from '../../../actions/AuthAction'

const InfoCard = () => {
  const [modalOpened, setModalopend] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  const profileUserId = params.id;

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
        console.log(profileUser)
      }
      else {//agar user match nhi kar rha to uss user ka details fetch karo db se
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log(profileUser)
      }
    }

    fetchProfileUser();
  }, [user])  //if user changes in react redux then only re-render useEffect

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <div className='InfoCard'>
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? <UilPen onClick={() => setModalopend(true)} /> : ""}
        {/* uilpen pe click karne pe modalOpened ki value true hogi, aur ProfileModal component me pass hogi, agar close pe click kiye to value iss component me bhi update ho jaaygi */}
        <ProfileModal 
        modalOpened={modalOpened} 
        setModalopend={setModalopend} 
        data = {user}
        />
      </div>


      <div className="info">
        <span><b>Status </b></span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span><b>Lives in </b></span>
        <span>{profileUser.livesin}</span>
      </div>
      <div className="info">
        <span><b>Works at </b></span>
        <span>{profileUser.worksAt}</span>
      </div>

      <button onClick={handleLogout} className="logout button">Logout</button>
    </div>
  )
}

export default InfoCard