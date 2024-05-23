import React, { useEffect } from 'react'
import "./Navbar.css"
import { Link ,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from "react-redux";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { getNotifications } from '../../api/Notification';
import SingleNotification from './SingleNotification/SingleNotification';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';


const Navbar = () => {
    const { user } = useSelector((state) => state.authReducer.authData);
    console.log("User id - ", user)

    const [isActive, setIsActive] = useState(false);

    const [notifications, setNotifications] = useState([])
    const [displayNotifications, setDisplayNoti] = useState([])

    const [currNotiLen, setCurrNotiLen] = useState(null);

    const toggleDropdown = () => {
        setIsActive(!isActive);
    };

    useEffect(async () => {
        const { data } = await getNotifications(user?._id);
        setNotifications(data[0].Notification)
        const displayNoti = [];
        let i = 0;
        for (i = 0; i < 5 && i < data[0].Notification.length; i++) {
            displayNoti.push(data[0].Notification[i])
        }
        setCurrNotiLen(i);
        setDisplayNoti(displayNoti)
    }, []);

    console.log("Notifications detail - ", notifications)
    const navigate = useNavigate();
    function switchVideoCall()
    {
        
        navigate('/video-call');
    }


    function goNext() {
        let i;
        const displayNoti = [];
        for (i = currNotiLen; i < currNotiLen + 5 && i < notifications.length; i++) {
            displayNoti.push(notifications[i])
        }
        console.log("Notifications ", displayNoti)
        setCurrNotiLen(i);
        setDisplayNoti(displayNoti)
    }
    


    function goBack() {
        let i;
        const displayNoti = [];
        for (i = currNotiLen - 5; i >= 0 && i < currNotiLen; i--) {
            displayNoti.push(notifications[i])
        }
        console.log("Notifications ", displayNoti)
        if (i < 0) {
            setCurrNotiLen(0);
        }
        else {
            setCurrNotiLen(i);
        }
        setDisplayNoti(displayNoti)
    }



    return (
        <>


            <div className="nav-main-bar">

                <div className='Navbar adj-nav'>
                    <header>
                        <div className="container-fluid">

                            <div className="navb-items d-none d-xl-flex ">
                                {/* 
                        <div className="item">
                            <Link to="/">Home</Link>
                        </div> */}
                                <div className="navb-logo item" >
                                    <img src="/images/logo.png" alt="Logo" />
                                </div>



                                {/* 
                            <div className="item">
                                <Link to="/cases">Cases</Link>
                            </div>

                            <div className="item">
                                <Link to="/about">About</Link>
                            </div> */}



                            </div>




                            {/* <!-- Button trigger modal --> */}
                            <div className="mobile-toggler d-lg-none">
                                <Link to="#" data-bs-toggle="modal" data-bs-target="#navbModal">
                                    <i className="fa fa-bars"></i>
                                </Link>
                            </div>

                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="navbModal" tabndex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">

                                        <div className="modal-header">
                                            <img src="/img/logo-variant.png" alt="Logo" />
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="fa-solid fa-xmark"></i></button>
                                        </div>

                                        <div className="modal-body">

                                            <div className="modal-line">
                                                <i className="fa-solid fa-house"></i><Link to="/">Home</Link>
                                            </div>

                                            <div className="modal-line">
                                                <i className="fa-solid fa-bell-concierge"></i><Link to="/services">Services</Link>
                                            </div>

                                            <div className="modal-line">
                                                <i className="fa-solid fa-file-lines"></i> <Link to="/cases">Cases</Link>
                                            </div>

                                            <div className="modal-line">
                                                <i className="fa-solid fa-circle-info"></i><Link to="/about">About</Link>
                                            </div>

                                            <Link to="/contact" className="navb-button" type="button">Let's talk</Link>
                                        </div>

                                        <div className="mobile-modal-footer">

                                            <Link target="_blank" to="#"><i className="fa-brands fa-instagram"></i></Link>
                                            <Link target="_blank" to="#"><i className="fa-brands fa-linkedin-in"></i></Link>
                                            <Link target="_blank" to="#"><i className="fa-brands fa-youtube"></i></Link>
                                            <Link target="_blank" to="#"><i className="fa-brands fa-facebook"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </header>


                </div>



            </div>

            <div className="noti-main">
                <div className="wrapper">
                    <div className="notification_wrap">
                        <div className="notification_icon d-flex">
                            <CircleNotificationsIcon style={{ fontSize: '55px' }} onClick={toggleDropdown} className='noti-icon' />
                            <CircleNotificationsIcon style={{ fontSize: '55px' }} onClick={switchVideoCall} className='noti-icon' />
                        </div>
                        
                        <div className={`dropdown ${isActive ? 'active' : ''}`}>

                            {
                                displayNotifications?.map((notification) => {
                                    return <SingleNotification key={notification?.NotificationId} data={notification} />
                                })
                            }

                            <div className="container d-flex justify-content-between">
                                <ArrowBackIcon className={`mt-2 ${(currNotiLen == 0 || notifications.length <= 5) && "disabled-forwad"}`} onClick={goBack} />
                                <ArrowForward className={`mt-2 ${currNotiLen == notifications.length && "disabled-forwad"}`} onClick={goNext} />
                            </div>

                            {/* Add the other notify_items here */}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar