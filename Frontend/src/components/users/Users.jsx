import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser } from '../../actions/followUser.js';
import { unfollowUser } from '../../actions/unfollowUser.js';
import "./User.css"

const Users = ({ person }) => {
    const dispatch = useDispatch();
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER; //for accesseing public image folder
    const { user } = useSelector((state) => state.authReducer.authData);

    const [following, setFollowing] = useState(person.followers.includes(user._id));

    const handleFollow = () => {
        console.log(user._id)
        if (following) {
            dispatch(unfollowUser(person._id, user._id));
        }
        else {
            dispatch(followUser(person._id, user._id));
        }
        setFollowing((prev)=>!prev);
    }

    return (
        <>
            <div className='follower'>
                <div>
                    <img src={person.profilePicture ? serverPublic + person.profilePicture : serverPublic + "defaultprofile.jpg"} alt="Image" className='followerImg' />
                    <div className='name'>
                        <span className='realname name-col'>{person.firstname} {person.lastname}</span>
                        <span className='name-col'>{person.username}</span>
                    </div>
                </div>
                <div className="">
                    <button onClick={handleFollow} className={following ? "button fc-button UnfollowButton" : "button fc-button"}>{following ? "Unfollow" : "Follow"}</button>
                </div>
            </div>
        </>
    )
}

export default Users