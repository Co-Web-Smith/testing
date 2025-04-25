import "./init";
import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

// Initialize socket with error handling
const socket = io("http://localhost:5000", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000,
});

const socketContext = createContext();

const ContextProvider = ({ children }) => {
  const [stream, setstream] = useState(null);
  const [me, setme] = useState("");
  const [call, setcall] = useState({
    isReceivedcall: false,
    from: "",
    name: "",
    signal: "",
  });
  const [callaccepted, setcallaccepted] = useState(false);
  const [callended, setcallended] = useState(false);
  const [name, setname] = useState("test");
  const [error, setError] = useState(null);
  const [info, setinfo] = useState("")
  const recordedChunks = useRef([]);


  const myvideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    // Socket error handling
    socket.on("connect_error", (err) => {
      setError(`Connection error: ${err.message}`);
    });

    socket.on("connect_timeout", () => {
      setError("Connection timeout - please try again");
    });

    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        setError("Disconnected by server");
      } else {
        setError("Connection lost - trying to reconnect...");
      }
    });

    // Initialize media devices
      const initializeMedia = async () => {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          setstream(mediaStream);

          if (myvideo.current) {
            myvideo.current.srcObject = mediaStream;
          }
        } catch (err) {
          setError(
            `Failed to access camera/microphone: ${
              err.message || "Please check permissions"
            }`
          );
        }
      };

      initializeMedia();

    


    socket.on("me", (id) => {
      setme(id);
    });

    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setcall({
        isReceivedcall: true,
        from,
        name: callerName,
        signal,
      });


    });
    socket.on("userLeft", (data) => {
      setinfo("User left");
      console.log(`User ${data.userId} has left the chat`);
  });
  

    return () => {
      // Cleanup
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (connectionRef.current) {
        connectionRef.current.destroy();
      }
      socket.off("me");
      socket.off("calluser");
      socket.off("userleft");
      socket.off("connect_error");
      socket.off("connect_timeout");
      socket.off("disconnect");
    };
  }, []);

  const answerCall = () => {
    try {
      setcallaccepted(true);
      setError(null);

      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });

      peer.on("signal", (data) => {
        socket.emit("answercall", { signal: data, to: call.from });
      });

      peer.on("stream", (remoteStream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = remoteStream;
        }
      });

      peer.on("error", (err) => {
        setError(`Peer connection error: ${err.message}`);
      });

      peer.signal(call.signal);
      connectionRef.current = peer;
    } catch (err) {
      setError(`Failed to answer call: ${err.message}`);
    }
  };

  const callUser = (id) => {
    if (!id) {
      setError("Please enter a valid ID to call");
      return;
    }

    try {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on("signal", (data) => {
        socket.emit("calluser", {
          userToCall: id,
          signalData: data,
          from: me,
          name,
        });
      });

      peer.on("stream", (remoteStream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = remoteStream;
        }
      });

      peer.on("error", (err) => {
        setError(`Peer connection error: ${err.message}`);
      });

      socket.on("callaccepted", (signal) => {
        setcallaccepted(true);
        setError(null);
        peer.signal(signal);
      });

      connectionRef.current = peer;
    } catch (err) {
      setError(`Failed to initiate call: ${err.message}`);
    }
  };
  const startRecording = () => {
    if (stream) {
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm; codecs=vp9',
      });
  
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };
  
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
        recordedChunks.current = [];
        const url = URL.createObjectURL(blob);
        downloadRecording(url); // Save or display the recording
      };
  
      mediaRecorder.start();
  
      // Ensure connectionRef.current is defined
      if (!connectionRef.current) {
        connectionRef.current = {};
      }
  
      connectionRef.current.mediaRecorder = mediaRecorder; // Assign the mediaRecorder
    } else {
      console.error('No stream available for recording.');
    }
  };

  const stopRecording = () => {
    if (connectionRef.current.mediaRecorder) {
      connectionRef.current.mediaRecorder.stop();
    } else {
      console.error('No active recording found.');
    }
  };
  
  const downloadRecording = (url) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `Recording-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };


  const leaveCall = () => {
    try {
      setcallended(true);
      if (connectionRef.current) {
        connectionRef.current.destroy();
stopRecording()
      }
      if (userVideo.current) {
        
        userVideo.current.srcObject = null;
      }


      window.location.reload();
    } catch (err) {
      setError(`Error ending call: ${err.message}`);
    }
  };

 
  
  
  return (
    <socketContext.Provider
      value={{
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
        info,startRecording,stopRecording,downloadRecording
      }}
    >
      {children}
    </socketContext.Provider>
  );
};

export { ContextProvider, socketContext };