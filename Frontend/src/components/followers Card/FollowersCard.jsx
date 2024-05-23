import { React, useEffect, useState } from 'react'
import "./followersCard.css"
import Users from '../users/Users'
import { useSelector } from "react-redux";
import { getAllUser } from '../../api/UserRequest';

const FollowersCard = () => {

  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);


  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    }
    fetchPersons();
  }, [])

  return (
    <div className='FollowersCard'>
      <h3 className='adj-mm'>Who is Following you</h3>
      {
        persons?.map((person, id) => {
          if (person._id !== user._id) {
            return <Users person={person} id={id} />
          }
        })
      }
    </div>
  )
}


export default FollowersCard