import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FaMicrophone,FaMicrophoneSlash,FaVideo,FaVideoSlash} from 'react-icons/fa'


import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const Controls = (props) => {
  const { tracks, setStart, setInCall, client } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    // we close the tracks to perform cleanup
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
   
    <div className="controls" >
      <div className={trackState.audio ? "on" : ""} onClick={() => mute("audio")}>
        {trackState.audio ? <FaMicrophoneSlash style={{height: 60,width: 30, cursor: 'pointer' }}/>: <FaMicrophone style={{height: 60,width: 20, cursor: 'pointer' }}/>}
      </div>
      <div className={trackState.video ? "on" : ""} onClick={() => mute("video")}>
        {trackState.video ? <FaVideoSlash style={{height: 60,width: 30, cursor: 'pointer' }}/> : <FaVideo style={{height: 60,width: 30, cursor: 'pointer' }}/>}
      </div>
      {<div onClick={() => leaveChannel()}><Button variant="danger">leave</Button></div>}
    </div>

    

  );
};

export default Controls;
