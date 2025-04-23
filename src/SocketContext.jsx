// import './init'
import React, { createContex, useState, useRef, useEffect, } from "react";
import { io} from "socket.io-client";
import Peer from "simple-peer";
if (typeof global === 'undefined') {
  var global = window; // Define `global` as `window` for browser compatibility
}


const socket = io("http://localhost:5000");
const socketContext = createContex();


const ContextProvider = ({ children }) => {
  const [stream, setstream] = useState(null);
  const [me, setme] = useState("");
  const [call, setcall] = useState({});
  const [callaccepted, setcallaccepted] = useState(false);
  const [callended, setcallended] = useState(false);
  const [name, setname] = useState("")

  const myvideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((CS) => {
        setstream(CS);
        myvideo.current.srcObject = CS;
      });

    socket.on("me", (id) => {
      setme(id);
    });

    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setcall({ isReceivedcall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setcallaccepted(true)

    const peer = new Peer({initiator:false, trickle:false,stream});
    peer.on('signal',(data)=>{
        socket.emit('answercall',{signal:data, to: call.from})
    })
  
    peer.on('stream',(CS)=>{
        userVideo.current.srcObject = CS;
    })

    peer.signal(call.signal)

    connectionRef.current = peer;

  };

  const callUser = (id) => {
    const peer = new Peer({initiator:true, trickle:false,stream});

    peer.on('signal',(data)=>{
        socket.emit('calluser',{userToCall: id, signalData: data, from:me, name})
    })
  
    peer.on('stream',(CS)=>{
        userVideo.current.srcObject = CS;
    })

    socket.on('callaccepted',(signal)=>{
        setcallaccepted(true);
        peer.signal(signal);
    })

    connectionRef.current = peer;

  };


  const leaveCall = () => {

    setcallended(true)
    connectionRef.current.destory();
   
  };

 
  



return(
    <socketContext.Provider value={{
    call,
    callaccepted,
    myvideo,
    userVideo,
    stream,
    name,
    setname,
    callended,
    me,
    callUser,
    answerCall,
    leaveCall
    }}>

      {children}

    </socketContext.Provider>
)



};


export {ContextProvider, socketContext};
