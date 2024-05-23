import React from 'react'
import Cover from "../../img/cover.jpg"
import Profile from "../../img/profileImg.jpg"
import "./ProfileCard.css"
import "../profileside/ProfileSide"
import { useSelector } from "react-redux"
import "./tempProfileCard.css"
import { Link, useNavigate } from 'react-router-dom';

const ProfileCard = ({ location }) => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER; //for accesseing public image folder
  console.log(user);

  return (
    <div className='ProfileCard'>
      {/* <div className='profileImages'>
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
          <span ><Link className='adj-text-color' style={{ textDecoration: "none" }} to={`/profile/${user._id}`}><img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultprofile.jpg"} alt="" /></Link>
          </span>
        )
      } */}



      <div className={location !== "profilePage" ? "cardd" : "cardd2"}>
        <div className="card-imgg">
          <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultprofile.jpg"} alt="" />
        </div>
        <div className="desc">
          <h6 className="primary-text commonh6">{user.firstname} {user.lastname}</h6>
          <h6 className="secondary-text commonh6">{user.worksAt ? user.worksAt : "Write about yourself"}</h6>
        </div>
        {
          location === "profilePage" ? '' : <button className="pro_btn " onClick={() => navigate(`/profile/${user._id}`)}>View Profile</button>
        }
        {
          location !== "profilePage" ? '' : <button className="pro_btn" onClick={() => navigate(`/home`)}>See Posts</button>
        }
        <div className={location === "profilePage" ? "details2" : "details"}>
          <div className="rating">
            <h6 className="primary-text commonh6"> {user.followers.length} </h6>
            <h6 className="secondary-text commonh6"> Followers </h6>
          </div>
          <div className="activity">
            <h6 className="primary-text commonh6"> {user.following.length} </h6>
            <h6 className="secondary-text commonh6"> Following </h6>
          </div>
          {
            location === "profilePage" && <div className="activity">
              <h6 className="primary-text commonh6"> {posts.filter((post) => post.userId === user._id).length} </h6>
              <h6 className="secondary-text commonh6"> Posts </h6>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ProfileCard