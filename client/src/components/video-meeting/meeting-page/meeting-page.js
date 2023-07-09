import React, { useState } from "react";
import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import VideoCall from "../Video/VideoCall";
import ChannelForm from "../Channel/ChannelForm";
import "./meeting.scss";
import Navbar from "../../navbar/navbar" ;

const config = {
  mode: "rtc",
  codec: "vp8",
};

const appId = "115c00ba3753465fabd28de0cfc2856e"; //ENTER APP ID HERE
//const token=null;
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const Meeting = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [token, setToken] = useState("");
  const [uid, setUid] = useState(null);
  console.log(channelName);
  return (
    <div>
    <Navbar/>

      {inCall ? (
        <VideoCall
          setInCall={setInCall}
          channelName={channelName}
          useClient={useClient}
          useMicrophoneAndCameraTracks={useMicrophoneAndCameraTracks}
          appId={appId}
          token={token}
          uid={uid}
        />
      ) : (
        <ChannelForm
          setInCall={setInCall}
          setChannelName={setChannelName}
          setToken={setToken}
          appId={appId}
          setUid={setUid}
        />
      )}
    </div>
  );
};

export default Meeting;
