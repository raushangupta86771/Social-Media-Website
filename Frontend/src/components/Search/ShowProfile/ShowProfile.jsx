import React from 'react'
import "./ShowProfile.scss"
import { useSelector } from "react-redux"


const ShowProfile = () => {

    const { user } = useSelector((state) => state.authReducer.authData);
    const { searchedUserData } = useSelector((state) => state.authReducer);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER; //for accesseing public image folder



    return (
        <div className='ShowProfile'>
            <div className="frame">
                <div className="center">

                    <div className="profile">
                        <div className="image">
                            <div className="circle-1"></div>
                            <div className="circle-2"></div>
                            <img src={searchedUserData.profilePicture ? serverPublic + searchedUserData.profilePicture : serverPublic + "defaultprofile.png"} width="70" height="70" alt="Jessica Potter" />
                        </div>

                        <div className="name">{searchedUserData?.firstname}</div>
                        <div className="job">Artist</div>

                        <div className="actions">
                            <button className="btn">{searchedUserData?.followers.includes(user._id) ? "Unfollow" : "Follow"}</button>
                            <button className="btn">Message</button>
                        </div>
                    </div>

                    <div className="stats">
                        <div className="box">
                            <span className="value">12</span>
                            <span className="parameter">Posts</span>
                        </div>
                        <div className="box">
                            <span className="value">{searchedUserData?.following.length}</span>
                            <span className="parameter">Followings</span>
                        </div>
                        <div className="box">
                            <span className="value">{searchedUserData?.followers.length}</span>
                            <span className="parameter">Follower</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowProfile