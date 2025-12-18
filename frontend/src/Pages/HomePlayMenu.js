import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../Utils/axiosInstance";
import CountdownTimer from "../Components/CountdownTimer";

import axios from "axios";

const HomePlayMenu = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const backUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(`${backUrl}/api/get-games`);
        const gamesWithPlay = res?.data?.map((g) => ({
          ...g,
          playStatus: g.PLAY === "checked" ? true : false, // optional boolean mapping
        }));

        setGames(gamesWithPlay);
      } catch (err) {
        console.error("Error fetching games:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);
  return (
  <div className="p-4">
    {/* Grid container - 2 cards per row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {games.map((game) => (
  <div
    key={game.ID}
    className="bg-white rounded-md shadow-md overflow-hidden"
  >

    {/* TOP BLACK HEADER */}
    <div className="bg-black text-white px-6 py-3 flex justify-between items-center">
      <h3 className="text-xl font-bold tracking-wide">
        {game.NAME}
      </h3>

      <span
        className={`px-4 py-1 rounded-full text-sm font-semibold ${
          game.playStatus ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {game.playStatus ? "Open" : "Timed Out"}
      </span>
    </div>

    {/* CARD BODY */}
    <div className="p-4 flex gap-5 items-center">

      {/* IMAGE SECTION */}
      <div className="bg-gray-100 p-3 rounded-xl">
        <img
          src="/images/matkacard.png?v=1"
          alt="Matka"
          className="w-20 h-20 object-contain"
        />
      </div>

      {/* INFO SECTION */}
      <div className="flex-1">

        {/* OPEN / CLOSE */}
        <div className="text-base font-semibold text-gray-800 mb-3 leading-tight">
          <div>OPEN: <span className="font-normal">{game.TIME1}</span></div>
          <div>CLOSE: <span className="font-normal">{game.TIME2}</span></div>
        </div>

        {/* ACTION ROW */}
        <div className="flex items-center gap-4">

          <Link
            to={game.playStatus ? `/play-game/${game.ID}` : "#"}
            className={`px-7 py-2.5 rounded-md text-white font-semibold text-sm ${
              game.playStatus
                ? "bg-gradient-to-l from-[#c31432] to-[#240b36] hover:opacity-90"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Play Now
          </Link>

          <CountdownTimer resultTime={game.RTIME} />

        </div>
      </div>
    </div>
  </div>
))}

    </div>
  </div>
);
}
export default HomePlayMenu;
