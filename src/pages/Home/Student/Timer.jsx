import React, { useState, useEffect } from "react";
import { MdOutlineNotStarted } from "react-icons/md";
import { CiPause1 } from "react-icons/ci";

const Timer = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${minutes}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (

    <>
      {
        initialSeconds == null ? "" : <div style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
          <button onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? <CiPause1 /> : <MdOutlineNotStarted />}
          </button>
          <h1 style={{ color: seconds === 0 ? "red" : "black", marginLeft: "10px", fontSize: "18px" }}>
            {formatTime(seconds)}
          </h1>
        </div>
      }
    </>

  );
};

export default Timer