import "./App.css"
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import Auth from "./pages/Auth/Auth";
import { Navigate, Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux";
import React, { useEffect } from 'react';
import FollowersCard from "./components/followers Card/FollowersCard";
import ProfileCard from "./components/profileCard/ProfileCard";
import ProfileCard_Mobile from "./components/profileCard/ProfileCard_Mobile";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import ShowProfile from "./components/Search/ShowProfile/ShowProfile";
import firebase from "./firebase"
import { Buffer } from 'buffer';
import { useDispatch } from 'react-redux';
import { addDeviceToken } from "./actions/AuthAction";
import Video_call_dashboard from "./components/video-call/Video_call_dashboard";
import { SocketProvider } from "./providers/Socket";
import Room from "./components/video-call/Room/Room";
import { PeerProvider } from "./providers/Peer";


global.Buffer = Buffer;

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authReducer.authData)

  useEffect(() => {
    let isMounted = true;

    const getFirebaseToken = async () => {
      try {
        const messaging = firebase.messaging();
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          const token = await messaging.getToken();

          if (isMounted) {
            console.warn('Token:', token);
            dispatch(addDeviceToken(token));
          }
        } else {
          console.warn('Notification permission denied');
        }
      } catch (error) {
        console.error('Error in fetching Firebase token:', error);
      }
    };


    getFirebaseToken();

    return () => {
      isMounted = false;
    };
  }, []);


  return (
    <div className="App">
      {/* <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}></div> */}

      <div className=" d-flex adj-top justify-content-between">
        <Navbar />
        <Search />
      </div>
      <SocketProvider>
      <PeerProvider>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
          />

          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="../auth" />}
          />

          <Route
            path="/auth"
            element={user ? <Navigate to="../home" /> : <Auth />}
          />

          <Route
            path="/profile/:id"
            element={user ? <Profile /> : <Navigate to="../auth" />}>
          </Route>

          <Route
            path="/video-call"
            element={user ? <Video_call_dashboard /> : <Navigate to="../auth" />}>
          </Route>
          <Route
            path="/room/:roomId"
            element={user ? <Room /> : <Navigate to="../auth" />}>
          </Route>


          <Route
            path="/followes"
            element={user ? <FollowersCard /> : <Navigate to="../auth" />}>
          </Route>


          <Route
            path="/userDetail"
            element={user ? <ShowProfile /> : <Navigate to="../auth" />}>
          </Route>


          <Route
            path="/view-profile"
            element={user ? < ProfileCard_Mobile location={"HomePage"} /> : <Navigate to="../auth" />}>
          </Route>


        </Routes>
        </PeerProvider>
      </SocketProvider>

    </div>
  );
}

export default App;
