import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { toast } from "react-toastify";

const DoublePatti = () => {
  const backUrl = process.env.REACT_APP_BACKEND_URL;
  const gameId = useParams().id;

  const [bets, setBets] = useState(Array(90).fill("")); // 90 inputs ka array
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(false);

  // Generate 90 Double Patti numbers (9 rows × 10 columns)
  // Double Patti = exactly 2 digits same
  const generateDoublePattiNumbers = () => {
    const numbers = [];
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        for (let k = 0; k <= 9; k++) {
          // Count how many digits are same
          const digits = [i, j, k];
          const uniqueDigits = new Set(digits);
          
          // Exactly 2 digits same means: 3 total digits, 2 unique values
          if (uniqueDigits.size === 2) {
            numbers.push(`${i}${j}${k}`);
          }
        }
      }
    }
    return numbers.sort().slice(0, 90); // Take first 90
  };

  const doublePattiNumbers = generateDoublePattiNumbers();

  const handleInputChange = (index, value) => {
    const updatedBets = [...bets];
    updatedBets[index] = value;
    setBets(updatedBets);
  };

  useEffect(() => {
    const total = bets.reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    setTotalPoints(total);
  }, [bets]);

  const handlePlaceBet = async () => {
    const filledBets = bets
      .map((val, index) => ({
        number: doublePattiNumbers[index],
        value: val,
      }))
      .filter((item) => item.value.trim() !== "");

    if (filledBets.length === 0) {
      toast.error("Please place at least one bet");
      return;
    }

    console.log("Filled Bets:", filledBets);

    try {
      setLoading(true);
      const res = await axiosInstance.post(`${backUrl}/api/bet-game-doublepatti`, {
        filledBets,
        gameId,
        totalPoints,
      });
      console.log("API Response:", res?.data);
      toast.success("Bet Placed Successfully ✅");
      window.location.reload();
    } catch (err) {
      console.error("API Error:", err);
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

      <div className="grid grid-cols-10 gap-2">
        {Array.from({ length: 90 }).map((_, i) => {
          const number = doublePattiNumbers[i];

          return (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-1"
            >
              {/* Number */}
              <div className="number bg-gradient-to-l from-[#c31432] to-[#240b36] text-white flex items-center justify-center w-full h-[52px] border border-[#c31432] text-center">
                {number}
              </div>

              {/* Input */}
              <input
                type="number"
                inputMode="numeric"
                min="0"
                value={bets[i]}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || Number(val) >= 0) {
                    handleInputChange(i, val);
                  }
                }}
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                className="w-full h-[33px] text-center border bg-transparent focus:outline-none"
              />
            </div>
          );
        })}
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

export default DoublePatti;
