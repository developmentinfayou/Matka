import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { toast } from "react-toastify";

const Patti = () => {
  const backUrl = process.env.REACT_APP_BACKEND_URL;
  const gameId = useParams().id;

  const [bets, setBets] = useState(Array(120).fill("")); // 120 inputs ka array
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(false);

  const [digits, setDigits] = useState(["", "", ""]);
const [point, setPoint] = useState("");


const handleDigitChange = (index, value) => {
  const updated = [...digits];

  // Reset next digits when previous changes
  if (index === 0) {
    updated[1] = "";
    updated[2] = "";
  }
  if (index === 1) {
    updated[2] = "";
  }

  updated[index] = value;
  setDigits(updated);
};


const getOptions = (position) => {
  if (position === 0) {
    return Array.from({ length: 8 }, (_, i) => i + 1); 
    // 1-8 tak hi, kyunki aage 2 digits increasing chahiye
  }

  if (position === 1 && digits[0]) {
    return Array.from(
      { length: 9 - digits[0] },
      (_, i) => Number(digits[0]) + i + 1
    );
  }

  if (position === 2 && digits[1]) {
    return Array.from(
      { length: 9 - digits[1] },
      (_, i) => Number(digits[1]) + i + 1
    );
  }

  return [];
};


  // Generate 120 Single Patti numbers (12 rows × 10 columns)
  const generateSinglePattiNumbers = () => {
    const numbers = [];
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        for (let k = 0; k <= 9; k++) {
          if (i !== j && j !== k && i !== k) {
            numbers.push(`${i}${j}${k}`);
          }
        }
      }
    }
    return numbers.sort().slice(0, 120);
  };

  // const singlePattiNumbers = generateSinglePattiNumbers();

  // const handleInputChange = (index, value) => {
  //   const updatedBets = [...bets];
  //   updatedBets[index] = value;
  //   setBets(updatedBets);
  // };

  useEffect(() => {
    const total = bets.reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    setTotalPoints(total);
  }, [bets]);

  const handlePlaceBet = async () => {
    if (digits.includes("")) {
      toast.error("Please select 3 digits");
      return;
    }
  
    if (!point || Number(point) <= 0) {
      toast.error("Enter valid points");
      return;
    }
  
    const selectedNumber = digits.join("");
  
    try {
      setLoading(true);
  
      await axiosInstance.post(`${backUrl}/api/bet-game-singlepatti`, {
  gameId,
  totalPoints: Number(point),
  filledBets: [
    {
      number: selectedNumber,
      value: Number(point),
    }
  ]
});
  
      toast.success("Bet Placed Successfully ✅");
  
      setDigits(["", "", ""]);
      setPoint("");
  
    } catch (err) {
      toast.error(err.response?.data?.message || "Error placing bet");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded mb-4">
        <div className="text-xs font-semibold">
          Total Points: <span className="text-blue-600">{totalPoints}</span>
        </div>
      </div>

<div className="text-center my-1">
     <span> Choose Patti Number</span>
     </div>

      <div className="flex gap-2 mb-4 justify-center">

   

  {/* First Digit */}
  <select
    value={digits[0]}
    onChange={(e) => handleDigitChange(0, e.target.value)}
    className="border p-2"
  >
    <option value="">Select</option>
    {getOptions(0).map((num) => (
      <option key={num} value={num}>{num}</option>
    ))}
  </select>

  {/* Second Digit */}
  <select
    value={digits[1]}
    onChange={(e) => handleDigitChange(1, e.target.value)}
    className="border p-2"
    disabled={!digits[0]}
  >
    <option value="">Select</option>
    {getOptions(1).map((num) => (
      <option key={num} value={num}>{num}</option>
    ))}
  </select>

  {/* Third Digit */}
  <select
    value={digits[2]}
    onChange={(e) => handleDigitChange(2, e.target.value)}
    className="border p-2"
    disabled={!digits[1]}
  >
    <option value="">Select</option>
    {getOptions(2).map((num) => (
      <option key={num} value={num}>{num}</option>
    ))}
  </select>




</div>

<div className="flex items-center justify-center">
<div className="border w-full p-2 h-10">{digits.join("")}</div>

  <input
  type="number"
  placeholder="Enter Points"
  value={point}
  min="1"
  onChange={(e) => setPoint(e.target.value)}
  className="border p-2 w-full h-10"
/>
</div>

      {/* Place Bet Button */}
      <button
        onClick={handlePlaceBet}
        disabled={loading}
        className={`mt-4 w-full text-white py-2 text-lg rounded 
          ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}
        `}
      >
        {loading ? "Placing Bet..." : "Place Bet"}
      </button>
    </div>
  );
};

export default Patti;
