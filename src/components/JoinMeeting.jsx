import React, { useContext, useEffect, useState } from "react";
import { socketContext } from "../SocketContext";
import {
  FaVideo,
  FaVideoSlash,
  FaPhone,
  FaMicrophone,
  FaMicrophoneSlash,
  FaPhoneSlash,
} from "react-icons/fa";

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
          <div className="flex justify-center items-center mb-2">
            <video
              ref={myvideo}
              autoPlay
              playsInline
              className="mt-4 border-2 h-[20rem] w-[27rem] "
            />
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

            <button
              onClick={() => callUser(idToCall)}
              disabled={!idToCall}
              className="flex justify-between items-center gap-x-1.5 p-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors disabled:opacit  disabled:cursor-not-allowed"
            >
             Ready To Goo! <FaPhone className="text-white text-xl " />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinMeeting;
