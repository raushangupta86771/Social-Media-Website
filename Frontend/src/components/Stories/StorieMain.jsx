import React, { useState, useEffect } from 'react';
import AddStory from './AddStory/AddStory';
import './StorieMain.css';
import { useDispatch, useSelector } from 'react-redux';
import Stories from 'react-insta-stories';
import InStory from './InStory';
import axios from "axios";
import InInStory from './InInStory';


const StorieMain = ({ storyy }) => {
    const [showAddStory, setShowAddStory] = useState(false);
    const [storyInstance, setStoryInstance] = useState([])

    const dispatch = useDispatch();
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER; //for accesseing public image folder
    const { user } = useSelector((state) => state.authReducer.authData);
    const [allStories, setAllStories] = useState([]);

    const [viewStory, setViewStory] = useState(false);
    const [timeoutKill, setTimeOutFun] = useState(false);

    const [tempView, setTempView] = useState([]);
    const [caption, setCaption] = useState("");



    const handleView = (ss, time) => {
        setViewStory((pre) => !pre);
        setStoryInstance(ss.image ? [process.env.REACT_APP_PUBLIC_FOLDER + ss.image] : "")
        clearTimeout(time)
        setCaption(ss.caption);

        const timeId = setTimeout(() => {
            setStoryInstance([])
            setViewStory(false)
        }, 10000)

        if (!ss.viewers?.includes(user._id) && !tempView.includes(user._id)) {
            const sendingBody = {
                userId: user._id,
                storyId: ss._id
            }
            axios
                .put(`http://localhost:5000/StoryRoutes/insertUserViewId`, sendingBody)
                .then(response => {
                    const rcvData = response.data;
                    if (rcvData.status === true) {
                        setTempView([...tempView, user._id]);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
        setTimeOutFun(timeId)
    };

    useEffect(() => {
        axios
            .get(`http://localhost:5000/StoryRoutes/getStories/${user?._id}`,)
            .then(response => {
                const rcvData = response.data;

                //doing below all the steps to sort the stories based on "not viewed yet" and "CREATED the story earlier"
                const array1 = [];
                const array2 = [];
                let count = 0;
                for (let i = 0; i < rcvData.length; i++) {
                    if (!rcvData[i].viewers.includes(user._id)) {
                        array1.push(rcvData[i]);
                    }
                    count = count + 1;
                }
                array1.sort((a, b) => {
                    return a.createdAt - b.createdAt;
                })
                for (let i = 0; i < rcvData.length; i++) {
                    if (rcvData[i].viewers.includes(user._id)) {
                        array2.push(rcvData[i]);
                    }
                }
                array2.sort((a, b) => {
                    return a.createdAt - b.createdAt;
                })
                const finalArray = array1.concat(array2)
                console.log(finalArray)
                // console.log(sortedDataBasedOnViewed)
                setAllStories(finalArray)
            })
            .catch(error => {
                console.log(error);
            });
    }, [])



    return (
        <>
            <div className='StorieMain'>
                <div className='add-story' onClick={() => setShowAddStory((prev) => !prev)}>
                    <div className='story-image'>
                        <img src='https://cdn-icons-png.flaticon.com/512/5860/5860939.png' alt='Add Story' />
                    </div>
                    <div className='story-text'>
                        <span>Add Story</span>
                    </div>
                </div>

                <div className='scoller'>
                    {
                        allStories?.map((story) => {
                            return <InStory key={story._id} storyy={story} setStoryInstance={setStoryInstance} storyInstance={storyInstance} handleView={handleView} viewStory={viewStory} setViewStory={setViewStory} timeoutKill={timeoutKill} setTimeOutFun={setTimeOutFun} tempView={tempView} />
                        })
                    }
                </div>

            </div>

            {
                viewStory && storyInstance.length > 0 && <InInStory viewStory={viewStory} storyy={storyy} storyInstance={storyInstance} handleView={handleView} caption={caption} />
            }
            {showAddStory && <AddStory />}
        </>
    );
};

export default StorieMain;
