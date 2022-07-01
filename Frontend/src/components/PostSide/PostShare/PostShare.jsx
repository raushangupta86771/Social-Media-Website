import React from 'react'
import profileImg from "../../../img/profileImg.jpg"
import "./PostShare.css"
import { UilScenery } from "@iconscout/react-unicons"
import { UilPlayCircle } from "@iconscout/react-unicons"
import { UilLocationPoint } from "@iconscout/react-unicons"
import { UilSchedule } from "@iconscout/react-unicons"
import { UilTimes } from "@iconscout/react-unicons"  //for "x" sign after selecting image, so that we can remove it if we want
import { useState } from 'react'
import { useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { uploadImage,uploadPost } from '../../../actions/UploadActions'

const PostShare = () => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER; //for accesseing public image folder

  const uploading=useSelector((state)=>state.postReducer.uploading);
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const { user } = useSelector((state) => state.authReducer.authData);
  const desc = useRef(); //kyuki description ka value direct user se le rhe to yaha pe useRef use karenge aur usko input field me daal denge

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img)
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id, //logged in user ka _id le rhe
      desc: desc.current.value,
    }

    if (image) { //agar post me image bhi hai to usko server ke local storage me save kar rhe, FormData() ke liye google karo
      const data = new FormData();
      const fileName = Date.now() + image.name; //file name will be current date with time + image name
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    };

    dispatch(uploadPost(newPost)); //sending post data (user_id,desc,image) to actions

    reset();
  }

  const reset=()=>{ //after uploading we are making null field in ui
    setImage(null);
    desc.current.value="";
  }

  return (
    <div className='PostShare'>
      <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultprofile.jpg"} alt="" />
      <div>
        <input ref={desc} required type="text" placeholder="What's Happening ?" />
        <div className="postOptions">
          <div className="option" style={{ color: "var(--photo)" }} onClick={() => imageRef.current.click()}>
            {/* Above onClick means whenever we click on photo icon or photo text then it will automatically click on imageRef() which is a input type(jiski apan display none kiye hai niche)  */}
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Schedule
          </div>
          <button disabled={uploading} onClick={handleSubmit} className='button btn-ps'>{uploading ? "Uploading..." : "Share"}</button>

          <div style={{ display: "none" }}>
            <input type="file" name='myImage' ref={imageRef} onChange={onImageChange} />
          </div>
          {/* isko ham sirf har jagah pe use karne ke liye banaye hai jaha pe hame file input me lena hai but use apan file type dikhana nhi chah rahe, ref ka kaam hot hai auto click karna */}

        </div>

        {
          image && (
            <div className='previewImage'>
              <UilTimes onClick={() => setImage(null)} />
              {/* above UilTimes format is svg   */}
              <img src={URL.createObjectURL(image)} alt="selectedImg" />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default PostShare