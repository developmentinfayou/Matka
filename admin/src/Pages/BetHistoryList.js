import React, { useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";

const BetHistoryList = () => {
  const [bets, setBets] = useState([]);
  const [filteredBets, setFilteredBets] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // default = today
  );
  const [selectedGame, setSelectedGame] = useState("");
  const [applyFilter, setApplyFilter] = useState(false);

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const res = await axiosInstance.get("/admin/get-game-load"); 
        setBets(res.data.bets || []);
      } catch (err) {
        console.error("Error fetching bets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, []);

  // 🔹 Fetch games list
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axiosInstance.get(`/api/get-games`);
        setGames(res.data || []);
      } catch (err) {
        console.error("Error fetching games:", err);
      }
    };
    fetchGames();
  }, []);


    // 🔹 Apply filters (by default only today)
    useEffect(() => {
        let temp = [...bets];
    
        if (applyFilter) {
          // When user clicks Search button → filter by date + game
          if (selectedDate) {
            temp = temp.filter((b) => b.date_time.startsWith(selectedDate));
          }
          if (selectedGame) {
            temp = temp.filter((b) => b.game_id === parseInt(selectedGame));
          }
        } else {
          // Default → only today's bets
          const today = new Date().toISOString().split("T")[0];
          temp = temp.filter((b) => b.date_time.startsWith(today));
        }
    
        setFilteredBets(temp);
      }, [bets, selectedDate, selectedGame, applyFilter]);

  // 🔹 Helper to group bets by type
const groupByType = (types) => {
  const filtered = filteredBets?.filter((b) => types.includes(b.type));
  const map = {};
  let total = 0;
  filtered.forEach((b) => {
    map[b.number] = (map[b.number] || 0) + b.point;
    total += b.point;
  });
  return { map, total };
};

// 🔹 Merge Jodi + Crossing + CopyPaste together
const jodi = groupByType(["Jodi", "Crossing", "CopyPaste"]);
const andarHaraf = groupByType(["AndarHaraf"]);
const baharHaraf = groupByType(["BaharHaraf"]);

  const grandTotal = jodi.total + andarHaraf.total + baharHaraf.total;

  // Fixed numbers for AndarHaraf & BaharHaraf
  const harafNumbers = ["000","111","222","333","444","555","666","777","888","999"];

  if (loading) return <p className="p-4">Loading bets...</p>;

  return (
    <div className="p-4 space-y-10">

        {/* 🔹 Filters */}
        <div className="flex flex-wrap gap-4 items-end border-b pb-4">
        <div>
          <label className="block text-sm font-medium">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Select Game</label>
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Games</option>
            {games.map((g) => (
              <option key={g.ID} value={g.ID}>
                {g.NAME}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setApplyFilter(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* 🔹 All Bets Table */}
<div>
  <h2 className="text-xl font-bold mb-4">All Bets</h2>

  <div className="overflow-x-auto bg-white rounded">
    <table className="min-w-full text-sm text-left">
      <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
        <tr>
          <th className="px-4 py-3 border">ID</th>
          <th className="px-4 py-3 border">Number</th>
          <th className="px-4 py-3 border">Points</th>
          <th className="px-4 py-3 border">Type</th>
          <th className="px-4 py-3 border">Game</th>
          <th className="px-4 py-3 border">Date</th>
          <th className="px-4 py-3 border">Status</th>
          <th className="px-4 py-3 border">Result</th>
          <th className="px-4 py-3 border">Phone</th>
        </tr>
      </thead>

      <tbody>
        {filteredBets.length > 0 ? (
          filteredBets.map((bet) => (
            <tr
              key={bet.id}
              className="hover:bg-gray-50 transition"
            >
              <td className="px-4 py-2 border">{bet.id}</td>
              <td className="px-4 py-2 border font-semibold">
                {bet.number}
              </td>
              <td className="px-4 py-2 border text-blue-600 font-medium">
                {bet.point}
              </td>
              <td className="px-4 py-2 border">{bet.type}</td>
              <td className="px-4 py-2 border">{bet.game}</td>
              <td className="px-4 py-2 border">
                {bet.date_time}
              </td>
              <td
                className={`px-4 py-2 border font-semibold ${
                  bet.status === "Win"
                    ? "text-green-600"
                    : bet.status === "Loss"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {bet.status || "Pending"}
              </td>
              <td className="px-4 py-2 border">
                {bet.result || "-"}
              </td>
              <td className="px-4 py-2 border">
                {bet.phone}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="9"
              className="text-center py-4 text-gray-500"
            >
              No Bets Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>


   
      {/* Grand Total */}
      <div className="text-center text-2xl font-bold mt-6">
        Grand Total: {grandTotal}
      </div>
    </div>
  );
};

export default BetHistoryList;
