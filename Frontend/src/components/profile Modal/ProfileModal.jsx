import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from "../../actions/UploadActions.js"
import {updateUser} from "../../actions/userActions"

function ProfileModal({ modalOpened, setModalopend, data }) {
  const theme = useMantineTheme();

  const { password, ...other } = data; //making a variable execpt password
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData()
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));

      } catch (error) {
        console.log(error);
      }
    }
    if (coverImage) {
      const data = new FormData()
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));

      } catch (error) {
        console.log(error);
      }
    }
    console.log(profileImage);

    //updating user
    dispatch(updateUser(param.id , UserData));
    setModalopend(false);
  }

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={modalOpened}
      onClose={() => setModalopend(false)}
    >
      <form action="" className='infoForm'>
        <form className="infoForm">
          <h3>Your info</h3>
          <input
            type="text"
            className="info"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstname}
          />
          <input
            type="text"
            className="info"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.lastname}
          />
          <input
            type="text"
            className="info"
            name="worksAt"
            placeholder="Works at"
            onChange={handleChange}
            value={formData.worksAt}
          />
          <input
            type="text"
            className="info"
            name="livesIn"
            placeholder="LIves in"
            onChange={handleChange}
            value={formData.livesIn}
          />

          <input
            type="text"
            className="info"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={formData.country}
          />
          <input
            type="text"
            className="info"
            placeholder="RelationShip Status"
            name='relationship'
            onChange={handleChange}
            value={formData.relationship}
          />
          Profile Image
          <input type="file" name='profileImage' onChange={onImageChange} />
          Cover Image
          <input type="file" name="coverImage" onChange={onImageChange} />

          <button onClick={handleSubmit} className="button infoButton">Update</button>
        </form>
      </form>
    </Modal>
  );
}

export default ProfileModal;