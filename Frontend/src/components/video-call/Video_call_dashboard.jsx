import React, { useEffect, useState, useCallback } from 'react';
import './Video_call_dashboard.css';
import { useSocket } from '../../providers/Socket';
import { useNavigate } from 'react-router-dom';

const VideoCallDashboard = () => {

  const navigate = useNavigate();

  const { socket } = useSocket();

  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");

  const handleRoomJoin = useCallback((e) => {
    e.preventDefault();
    console.log("user ",email," requested for roomId ",roomId);
    socket.emit("join-room", { emailId: email, roomId })
  }, [socket,email,roomId]);

  const handleRoomJoined = useCallback(({ roomId }) => {
    navigate(`/room/${roomId}`)
  }, [navigate])

  useEffect(() => {
    socket.on("joined-room", handleRoomJoined)

    return () => {
      socket.off("joined-room", handleRoomJoined)
    }
  }, [socket])

  return (
    <div className='Video_call_dashboard'>
      <div id="login">
        <form id="login_form">
          <div className="field_container">
            <input type="text" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="field_container">
            <input type="text" placeholder="Enter Room Code" value={roomId} onChange={e => setRoomId(e.target.value)} />
            <button id="sign_in_button">
              <span className="button_text" onClick={handleRoomJoin}>Enter Room</span>
            </button>
          </div>


        </form>

      </div>
    </div>
  );
};

export default VideoCallDashboard;
