import React, { useContext, useEffect, useState } from "react";
import { socketContext } from "../SocketContext";
import { FaVideo, FaVideoSlash, FaPhone, FaMicrophone, FaMicrophoneSlash, FaPhoneSlash } from "react-icons/fa";
import { MdPhoneDisabled } from "react-icons/md";

const InstantMeeting = () => {
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
    setall_users,all_users
  } = useContext(socketContext);

  const [idToCall, setidToCall] = useState("");
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }

setall_users((prev)=>[...prev , me])
console.log(me,all_users)


  }, [error]);

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-black">
        <div className="flex justify-between items-center gap-4 p-4">
          {stream && (
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
          )}

          {callaccepted && !callended && (
            <div className="relative">

              <video
                autoPlay
                ref={userVideo}
                playsInline
                className="border-2 h-60 w-[30rem] rounded-lg"
              />
              <p className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                {call?.name || "Caller"}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between items-center">
          {error && (
            <div className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4">
              {error}
            </div>
          )}

          {call?.isReceivedcall && !callaccepted && (
            <div className="flex justify-center items-center gap-4 bg-gray-800 p-4 rounded-lg">
              <p className="text-xl text-white">{call.name} wants to join</p>
              <button
                onClick={answerCall}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Accept
              </button>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 bg-gray-950 h-20 w-full flex justify-between items-center px-8">
          <div className="flex justify-between items-center gap-x-4">
            <div className="bg-gray-800 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-400">Your ID:</p>
              <p className="text-white font-mono">{me}</p>
            </div>
            <div className="bg-gray-800 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-400">Name:</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="bg-transparent text-white outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between items-center gap-x-4">
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

            {callaccepted && !callended && (
              <button
                onClick={leaveCall}
                className="p-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
              >
                <FaPhoneSlash className="text-white text-xl" />
              </button>
            )}

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={idToCall}
                onChange={(e) => setidToCall(e.target.value)}
                placeholder="Enter ID to call"
                className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => callUser(idToCall)}
                disabled={!idToCall}
                className="p-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPhone className="text-white text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstantMeeting;