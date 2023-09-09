// AuctionTimer.js
import React, { useEffect, useState } from "react";
import styles from "./AuctionTimer.module.css"; // Import the CSS file

const AuctionTimer = ({ startTime, endTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [timerExpired, setTimerExpired] = useState(false); // Add this state

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const endDate = new Date(endTime);
      const remainingTime = endDate - now;

      if (remainingTime <= 0) {
        // Auction has ended
        setTimeRemaining("Auction Ended");
        setTimerExpired(true); // Set the timerExpired state to true
      } else {
        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    };

    const timer = setInterval(calculateTimeRemaining, 1000);

    // Calculate initial time remaining
    calculateTimeRemaining();

    return () => clearInterval(timer);
  }, [endTime]);

  // Apply a CSS class based on the timerExpired state
  const timerClass = timerExpired
    ? `${styles.timerExpired} ${styles.auctionTimer}`
    : styles.auctionTimer;

  return (
    <div className={timerClass}>
      <p>
        Start Time:
        <br /> {new Date(startTime).toLocaleString()}
      </p>
      <p>
        End Time:
        <br /> {new Date(endTime).toLocaleString()}
      </p>
      <p>
        Time Remaining:
        <br /> {timeRemaining}
      </p>
    </div>
  );
};

export default AuctionTimer;
