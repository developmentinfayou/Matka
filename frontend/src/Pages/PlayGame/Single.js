import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import { toast } from 'react-toastify';

const Single = () => {
  const backUrl = process.env.REACT_APP_BACKEND_URL;

  const [bets, setBets] = useState(Array(10).fill(""));
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(false);

  const gameId = useParams().id;

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
        number: String(index),
        value: val,
      }))
      .filter((item) => item.value.trim() !== "");

    console.log("Filled Bets:", filledBets);

    try {
      setLoading(true);
      const res = await axiosInstance.post(`${backUrl}/api/bet-game-single`, { 
        filledBets, 
        gameId, 
        totalPoints 
      });
      console.log("API Response:", res?.data);
      toast.success("Bet Placed Successfully ✅");
      window.location.reload();
    } catch (err) {
      console.error("API Error:", err);
      toast.error(err.response.data.message || "Error placing bet");
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

      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-1"
          >
            <div className="number bg-gradient-to-l from-[#c31432] to-[#240b36] text-white flex items-center justify-center w-full h-[52px] border border-[#c31432] text-center">
              {i}
            </div>

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
        ))}
      </div>

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

export default Single;
