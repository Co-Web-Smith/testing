import React, { useContext, useEffect, useState } from "react";
import { socketContext } from "../SocketContext";
import {FaVideo,FaVideoSlash,FaPhone,FaMicrophone,FaMicrophoneSlash,FaPhoneSlash,} from "react-icons/fa";

const JoinMeeting = () => {
  const {
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
    leaveCall,
    error,
    info
  } = useContext(socketContext);

  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [idToCall, setidToCall] = useState("");

  useEffect(() => {
    setidToCall(localStorage.getItem('id'))

  }, [])
  

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center  items-center w-screen">
        {/* Client/My Preview  */}
        <div className="flex flex-col justify-center items-center">
          <h1 className="xl text-center ">Your Preview</h1>
          <p>Room Code:  {idToCall}</p>

          {/* Video preview */}
          <div className="flex justify-between items-center gap-4 p-4">
            <div className="relative">
              <video
                autoPlay
                muted
                ref={myvideo}
                playsInline
                className="border-2 h-60 w-[30rem] rounded-lg"
              />
              <p className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                You ({name})
              </p>
            </div>

          {callaccepted && !callended && (
            <div className="relative">

              <video
                autoPlay
                ref={userVideo}
                playsInline
                className="border-2 h-60 w-[30rem] rounded-lg"
              />
              <p className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                {call?.name || "Caller"}  {info}
              </p>
            </div>
          )}
        </div>

          {/* All option */}
          <div className="flex justify-center items-center mt-4 gap-x-2">
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full ${
                isVideoEnabled ? "bg-gray-700" : "bg-red-500"
              } hover:opacity-80 transition-opacity`}
            >
              {isVideoEnabled ? (
                <FaVideo className="text-white text-xl" />
              ) : (
                <FaVideoSlash className="text-white text-xl" />
              )}
            </button>

            <button
              onClick={toggleAudio}
              className={`p-3 rounded-full ${
                isAudioEnabled ? "bg-gray-700" : "bg-red-500"
              } hover:opacity-80 transition-opacity`}
            >
              {isAudioEnabled ? (
                <FaMicrophone className="text-white text-xl" />
              ) : (
                <FaMicrophoneSlash className="text-white text-xl" />
              )}
            </button>


  
  {!callaccepted && !callended ? (
  <button
  onClick={() => callUser(idToCall)}
  disabled={!idToCall}
  className="flex justify-between items-center gap-x-1.5 p-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors disabled:opacit  disabled:cursor-not-allowed"
>
 Ready To Goo! <FaPhone className="text-white text-xl " />
</button>



  ):<button
  onClick={leaveCall}
  className="flex justify-between items-center gap-x-1.5 p-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors disabled:opacit  disabled:cursor-not-allowed"
  >
  Hang up <FaPhoneSlash className="text-white text-xl " />
  </button>}
          
 
          
            
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinMeeting;
