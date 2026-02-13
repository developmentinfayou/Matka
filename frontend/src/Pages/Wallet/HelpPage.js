import React, { useEffect, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import axiosInstance from "../../Utils/axiosInstance";

const HelpPage = () => {

  const [whatsapp, setWhatsapp] = useState("");

  useEffect(() => {
    const fetchWhatsApp = async () => {
      try {
        const res = await axiosInstance.get("/admin/get-whatsapp"); // 👈 API call
        if (res.data?.whatsapp) {
          setWhatsapp(res.data.whatsapp);
        }
      } catch (err) {
        console.error("Error fetching WhatsApp:", err);
      }
    };

    fetchWhatsApp();
  }, []);

  // WhatsApp redirect function
  const openWhatsApp = () => {
    if (!whatsapp) return;
    // 👇 Whatsapp chat open karega
    window.open(`https://wa.me/${whatsapp}`, "_blank");
  };
  
  return (
    <div className="w-full min-h-screen bg-gray-50 py-6 px-4">
      {/* Title */}
      <h1 className="text-center text-xl font-bold text-red-600 mb-4">
        💥 888 Solutions HELP & SUPPORT 💥
      </h1>

      {/* Info Card */}
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-4">
  <p className="text-center text-sm text-yellow-700 font-semibold mb-3">
    🔥 Min Deposit: Rs. 100 | Min Withdraw: Rs. 1000 | Rate 10 for 980 🔥
  </p>

  <p className="text-center text-base font-semibold text-green-700 mb-4">
    👽 Learn How to Play the Game 👽
  </p>

  {/* Game Rule 1 */}
  <p className="mb-3 text-gray-700 leading-relaxed">
    🔥 In every game, one Jodi is selected from 1 to 100. If you have placed
    your bet on the same Jodi that appears in the result, you will receive 98x
    your money.
  </p>

  {/* Game Rule 2 */}
  <p className="mb-3 text-gray-700 leading-relaxed">
    🔥 For example, if you place 10 rupees on a Jodi and that same Jodi appears
    in the result, you will receive 980 rupees for your 10 rupees.
  </p>

  {/* Game Rule 3 */}
  <p className="mb-3 text-gray-700 leading-relaxed">
    🔥 You can place bets on as many numbers as you want. You just need to win,
    and once you win, the money will be credited to your wallet.
  </p>

  {/* Video Tutorial */}
  <div className="text-center mt-6 hidden">
    <p className="text-sm text-blue-600 font-medium mb-2">
      👇👽 Click the Video icon to learn DEPOSIT and WITHDRAW 👽
    </p>

    <button className="bg-red-500 text-white px-5 py-2 rounded shadow hover:bg-red-600">
      🎥 Watch Tutorial
    </button>

    {whatsapp && (
      <button
        onClick={openWhatsApp}
        className="flex items-center mt-2 gap-2 mx-auto bg-green-500 text-white px-3 py-3 rounded shadow hover:bg-green-600"
      >
        <BsWhatsapp size={22} />
      </button>
    )}
  </div>
</div>

    </div>
  );
};

export default HelpPage;
