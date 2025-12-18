import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ resultTime }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const today = now.toDateString();
      const resultDateTime = new Date(`${today} ${resultTime}`);
      
      // If result time has passed today, set it for tomorrow
      if (resultDateTime <= now) {
        resultDateTime.setDate(resultDateTime.getDate() + 1);
      }
      
      const difference = resultDateTime - now;
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        return '00:00:00';
      }
    };

    // Update immediately
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, [resultTime]);

  return (
    <div className="bg-black text-white px-4 py-2 rounded-md text-base font-mono">
      {timeLeft}
    </div>
  );
};

export default CountdownTimer;
