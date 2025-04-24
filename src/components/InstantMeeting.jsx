import React, { useContext, useEffect, useState } from "react";
import { socketContext } from "../SocketContext";
import { FaVideo,FaVideoSlash,FaPhone,FaMicrophone,FaMicrophoneSlash, FaPhoneSlash } from "react-icons/fa";
import { MdPhoneDisabled } from "react-icons/md";



const InstantMeeting = () => {
  const {call, callaccepted, myvideo, userVideo, stream, name, setname, callended, me, callUser, answerCall, leaveCall,} = useContext(socketContext);
  const [idToCall, setidToCall] = useState("")
  useEffect(() => {

console.log(call)


  }, [])

  

  return (
    <>
      <div className="flex flex-col justify-center items-center">

        <div className="flex flex-col justify-center items-center h-screen w-screen bg-black ">
          <div className="flex justify-between items-center">
            {stream && (
              <video
                autoPlay
                muted
                ref={myvideo}
                playsInline
                className="border-2 h-60 w-[30rem]"
              />
            
            )}

{callaccepted  &&  !callended  &&(
              <video
                autoPlay
                muted
                ref={userVideo}
                playsInline
                className="border-2 h-60 w-[30rem]"
              />
            
            )}


          </div>


          <div className="flex flex-col justify-between items-center">
<h2 className="text-5xl">users</h2>

{call.isReceivedcall && !callaccepted && (

<div className="flex justify-center items-center">

<p className="text-3xl">{call.name} want's to join</p>

<button onClick={answerCall}>Accept</button>

</div>
)}


</div>



          <div className="absolute bottom-0 bg-gray-950 h-20 w-[100%] flex justify-evenly items-center gap-x-2 ">

            <div className="flex justify-between items-center gap-x-2">
              <h2 className="text-xl text-white">Your id  {me}</h2>
              <h2 className="text-xl text-white">Name {name}</h2>
            </div>

            <div className="flex justify-between items-center gap-x-2">
<button> <FaVideo className="text-lg h-10  "/></button>

<button ><FaMicrophone className="text-lg h-10   "/></button>

{callaccepted && !callended (
  <button ><FaPhoneSlash onClick={leaveCall} className="text-lg h-10 "/></button>

)}

<button onClick={ ()=> callUser(idToCall) } ><FaPhone  className="text-lg h-10 "/></button>
<input className=" mb-4 border-2" value={idToCall} onChange={(e)=> setidToCall(e.target.value)}/>


            </div>



          </div>


        </div>
      </div>
    </>
  );
};

export default InstantMeeting;
