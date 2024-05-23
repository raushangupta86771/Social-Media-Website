import React, { useEffect, useCallback, useState } from 'react'
import "./Room.css"
import { useSocket } from "../../../providers/Socket"
import { usePeer } from '../../../providers/Peer'
import ReactPlayer from "react-player";

const Room = () => {
  const { socket } = useSocket();
  const { peer, createOffer, createAnswer, setRemoteAns, sendStream, remoteStream } = usePeer();

  const [myStream, setMystream] = useState(null)
  const[remoteEmailId, setRemoteEmailId]=useState(null);

  const handleNewUserJoined = useCallback(
    async (data) => {
      const { emailId } = data;
      console.log("New user joined room ", emailId)
      const offer = await createOffer();
      socket.emit('call-user', { emailId, offer })
      setRemoteEmailId(emailId);
    }, [createOffer, socket]);

  const handleIncommingCall = useCallback(async (data) => {
    const { from, offer } = data
    console.log('Incoming call from ', from, " ", offer)
    const ans = await createAnswer(offer);
    socket.emit('call-accepted', { emailId: from, ans });
    setRemoteEmailId(from);
  }, [])

  const handleCallAccepted = useCallback(async (data) => {
    const { ans } = data;
    console.log('Call got accepted ', ans);
    await setRemoteAns(ans);

  }, [setRemoteAns])

  useEffect(() => {
    socket.on('user-joined', handleNewUserJoined)
    socket.on('incomming-call', handleIncommingCall)
    socket.on('call-accepted', handleCallAccepted)

    return () => {
      socket.off('user-joined', handleNewUserJoined)
      socket.off('incomming-call', handleIncommingCall)
      socket.off('call-accepted', handleCallAccepted)
    };
  }, [handleNewUserJoined, socket])

  const getUserMediaStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })

    setMystream(stream)
  }, [])

  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream])

  const handleNegotiation=useCallback(()=>{
    const localOffer=peer.localDescription;
    socket.emit('call-user', { emailId:remoteEmailId, localOffer })
    console.log("Ooops! Neg. needed")
},[])

useEffect(()=>{
    peer.addEventListener('negotiationneeded',handleNegotiation)
    return()=>{
        peer.removeEventListener('negotiationneeded',handleNegotiation)
    }
},[peer,handleNegotiation])

  return (
    <div className='Room'>
      <h1>Room Page</h1>
      <button onClick={e => sendStream(myStream)} >Send My Video</button>
      <h1>You are Connected to {remoteEmailId}</h1>
      <ReactPlayer url={myStream} playing={true} muted />
      <ReactPlayer url={remoteStream} playing={true} />
    </div>
  )
}

export default Room