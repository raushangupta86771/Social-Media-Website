import React from 'react'
import "./InResult.css"
import { useDispatch, useSelector } from 'react-redux';
import { showUserDetails } from '../../../actions/userActions';
import { Link, useNavigate } from 'react-router-dom';

const InResult = ({ result, setResults, setInput, handleReset }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(showUserDetails(result))
        navigate('/userDetail');
        // handleReset();
        setResults([])
    }

    return (
        <div
            className="search-result"
            onClick={handleSubmit}
        >
            <div className='adj-inner-search'>
                <div className="inner-image-search">
                    <img src={result.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + result.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultprofile.png"} alt="" />
                </div>
                <div className="text-search">
                    {result.firstname}
                </div>
            </div>
        </div>
    )
}

export default InResult