import React, { useState, useEffect } from 'react';
/*eslint-disable*/
type MyComponentProps = {
  started: boolean;
};

const TimerClock: React.FC<MyComponentProps> = ({ started }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState<null | NodeJS.Timeout>(null); // Type adjustment here

  // Function to format time in MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start or pause the timer
  const toggleTimer = () => {
    if (isActive) {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIsActive(false);
    } else {
      const id = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(id);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      setIntervalId(id);
      setIsActive(true);
    }
  };

  // Reset the timer
  const resetTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setTimeLeft(600);
    setIsActive(false);
  };

  // Automatically start the timer when `started` becomes true
  useEffect(() => {
    if (started && !isActive) {
      toggleTimer();
    }
  }, [started]);

  // Clean up the interval when the component unmounts
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div>
      <h1>{formatTime(timeLeft)}</h1>
      <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default TimerClock;
