import { useState, useEffect } from 'react';
import Stories from "react-insta-stories"
import InInStory from './InInStory';
import { useDispatch, useSelector } from 'react-redux';

const InStory = ({ storyy, storyInstance, setStoryInstance, handleView, setViewStory, viewStory, setTimeOutFun, timeoutKill, tempView }) => {

    const dispatch = useDispatch();
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER; //for accesseing public image folder
    const { user } = useSelector((state) => state.authReducer.authData);


    useEffect(() => {
        return () => {
            // cleanup any asynchronous operations here
        };
    }, []);

    const handleClick = () => {
        alert("hey")
        handleView(storyy);
    };


    return (
        <div className="vie-story">
            <div className={storyy.viewers.includes(user._id) || tempView.includes(user._id) ? "scoller-item2" : "scoller-item1"} onClick={() => handleView(storyy, timeoutKill)}>
                <img className='img_of_story'
                    src={storyy.image ? process.env.REACT_APP_PUBLIC_FOLDER + storyy.image : ''}
                    alt=""
                />
                <p>{storyy.username}</p>
            </div>
        </div>
    );
};

export default InStory;
