import React from 'react'
import Cover from "../../img/cover.jpg"
import Profile from "../../img/profileImg.jpg"
import "./ProfileCard_Mobile.css"
import "../profileside/ProfileSide"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "./ProfileCard_Mobile.css"

const ProfileCard_Mobile = ({ location }) => {

  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER; //for accesseing public image folder
  console.log(user);

  return (
    <div className='ProfileCard_Mobile'>
      <div className='profileImages'>
        <img src={user.coverPicture ? serverPublic + user.coverPicture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS18VEnnxilzuz5ts_2P4QWAsPyl4d7AQurTQ&usqp=CAU"} alt="" />
        <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultprofile.jpg"} alt="" />
      </div>

      <div className="profileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
      </div>

      <div className='followStatus'>
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>

          {
            location === "profilePage" && (
              <>
                <div className='vl'>

                </div>

                <div className='follow'>
                  <span>{posts.filter((post) => post.userId === user._id).length}</span>
                  <span>Posts</span>
                </div>
              </>
            )
          }

        </div>
        <hr />
      </div>
      {
        location === "profilePage" ? '' : (
          <span ><Link className='adj-text-color adj-edit-center' style={{ textDecoration: "none" }} to={`/profile/${user._id}`}><img src='https://cdn-icons-png.flaticon.com/512/166/166256.png' className='adj-edit-icon'/></Link>
          </span>
        )
      }
    </div>
  )
}

export default ProfileCard_Mobile