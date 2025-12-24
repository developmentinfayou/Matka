import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import { scheduleCronForGame } from "./cronController.js";
import { insertAccountEntry } from "./utils/accountHelper.js";





export const AdminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // First check in SETTINGS for main admin
    const [adminRows] = await req.db.query(
      "SELECT mobile, otp FROM SETTINGS LIMIT 1"
    );

    if (adminRows.length > 0) {
      const admin = adminRows[0];
      if (username === admin.mobile && password === admin.otp) {
        const token = jwt.sign(
          { username: admin.mobile, role: "admin" },
          process.env.JWT_SECRET,
          { expiresIn: "8h" }
        );

        return res.json({
          success: true,
          message: "Admin login successful",
          role: "admin",
          username: admin.mobile,
          token,
        });
      }
    }

    // Check in USERS table by mobile OR name
    const [userRows] = await req.db.query(
      "SELECT * FROM users WHERE (MOBILE = ? OR NAME = ?) AND PASSWORD = ?",
      [username, username, password]
    );

    if (userRows.length > 0) {
      const user = userRows[0];
      const userRole = (user.role || 'user').toLowerCase();
      
      // Only allow agent login
      if (userRole === 'agent') {
        const token = jwt.sign(
          { username: user.MOBILE, role: 'agent' },
          process.env.JWT_SECRET,
          { expiresIn: "8h" }
        );

        return res.json({
          success: true,
          message: "Agent login successful",
          role: 'agent',
          username: user.MOBILE,
          token,
        });
      }
      
      return res.status(403).json({ 
        success: false, 
        message: "Access denied. Only admin and agents can access admin panel." 
      });
    }

    return res.status(401).json({ 
      success: false, 
      message: "Invalid credentials" 
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




export const ChangePasswordAdmin = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
  
    try {
      // Pehle current password le aao
      const [rows] = await req.db.query("SELECT otp FROM SETTINGS LIMIT 1");
  
      if (!rows || rows.length === 0) {
        return res.status(404).json({ success: false, message: "Admin not found" });
      }
  
      const currentPass = rows[0].otp;
  
      if (oldPassword !== currentPass) {
        return res.status(400).json({ success: false, message: "Old password incorrect" });
      }
  
      // Update new password
      await req.db.query("UPDATE SETTINGS SET otp = ? LIMIT 1", [newPassword]);
  
      res.json({ success: true, message: "Password changed successfully" });
    } catch (err) {
      console.error("ChangePassword error:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

export const getAdminDetails = (req, res) => {
    const { username, role } = req.user;
    // console.log(req.user, "reqqkss user");
    return res.json({
        success: true,
        message: "Admin details fetched successfully",
        user: { username, role },
    });
};




// ✅ Admin Dashboard Data API
export const adminDashboardData = async (req, res) => {
    try {

      const { date } = req.query; // query se date pick karlo
      let dateCondition = "";
      let dateValues = [];
  
      if (date) {
        dateCondition = " AND DATE(TIME) = ? ";
        dateValues.push(date);
      }


        // 1️⃣ Active users ka total wallet balance
        const [userBalanceRows] = await req.db.query(
            `SELECT SUM(WALLET) as totalBalance 
         FROM users 
         WHERE STATE = 'active' ${date ? "AND DATE(DATE) = ?" : ""}`,
         date ? [date] : []
        );
        const customerBalance = userBalanceRows[0]?.totalBalance || 0;

        // 2️⃣ Deposit status wise sum
        const [depositRows] = await req.db.query(
            `SELECT STATUS, SUM(AMOUNT) as total 
         FROM PAYMENT_QUEUE 
         WHERE 1=1 ${date ? "AND DATE(TIME) = ?" : ""}
         GROUP BY STATUS`,date ? [date] : []
        );

        let depositSummary = {
            approved: 0,
            pending: 0,
            cancelled: 0,
        };
        depositRows.forEach((row) => {
            depositSummary[row.STATUS] = row.total || 0;
        });

        // 3️⃣ Withdraw status wise sum
        const [withdrawRows] = await req.db.query(
            `SELECT STATUS, SUM(AMOUNT) as total 
         FROM WITHDRAW 
          WHERE 1=1 ${date ? "AND DATE(TIME) = ?" : ""}
         GROUP BY STATUS`,date ? [date] : []
        );

        let withdrawSummary = {
            approved: 0,
            pending: 0,
            cancelled: 0,
        };
        withdrawRows.forEach((row) => {
            withdrawSummary[row.STATUS] = row.total || 0;
        });


        // 4️⃣ Total betting (STATUS = NULL)
        const [totalBettingRows] = await req.db.query(
            `SELECT SUM(POINT) as totalBetting
             FROM bets
             WHERE STATUS IS NULL ${date ? "AND DATE(DATE_TIME) = ?" : ""}`, date ? [date] : []
        );
        const totalBetting = totalBettingRows[0]?.totalBetting || 0;

        // 5️⃣ Total Win Amount (SUM of WIN_AMOUNT)
        const [totalWinRows] = await req.db.query(
            `SELECT SUM(WIN_AMOUNT) as totalWinAmount
             FROM bets WHERE 1=1 ${date ? "AND DATE(DATE_TIME) = ?" : ""}`,date ? [date] : []
        );
        const totalWinAmount = totalWinRows[0]?.totalWinAmount || 0;

        // 6️⃣ Total Commission (5% of POINT where STATUS = 'Loss')
        const [commissionRows] = await req.db.query(
            `SELECT SUM(earn) as totalCommission
             FROM commission
             WHERE STATUS = 'Loss' ${date ? "AND DATE(DATE_TIME) = ?" : ""}`,date ? [date] : []
        );
        const totalCommission = commissionRows[0]?.totalCommission || 0;

        // 7️⃣ Total Profit (sum of POINT where STATUS = 'Loss')
        const [profitRows] = await req.db.query(
            `SELECT SUM(POINT) as totalProfit
             FROM bets
             WHERE STATUS = 'Loss' ${date ? "AND DATE(DATE_TIME) = ?" : ""}`,
             date ? [date] : []
        );
        const totalProfit = profitRows[0]?.totalProfit || 0;


    // // 8️⃣ Games wise data (GAME_ID, GAME, SUM of POINT, SUM of WIN_AMOUNT)
    // const [gamesDataRows] = await req.db.query(
    //   `SELECT GAME_ID, GAME, 
    //           SUM(POINT) as totalBid, 
    //           SUM(WIN_AMOUNT) as totalWin
    //    FROM bets
    //    WHERE 1=1 ${date ? "AND DATE(DATE_TIME) = ?" : ""}
    //    GROUP BY GAME_ID, GAME`,
    //   date ? [date] : []
    // );

    // 8️⃣ Games wise data (All games with totalBid & totalWin)
const [gamesDataRows] = await req.db.query(
  `SELECT g.ID AS GAME_ID, 
          g.NAME AS GAME, 
          IFNULL(SUM(b.POINT), 0) AS totalBid, 
          IFNULL(SUM(b.WIN_AMOUNT), 0) AS totalWin
   FROM games g
   LEFT JOIN bets b 
          ON g.ID = b.GAME_ID
          ${date ? "AND DATE(b.DATE_TIME) = ?" : ""}
   GROUP BY g.ID, g.NAME
   ORDER BY g.ID`,
  date ? [date] : []
);

        return res.json({
            success: true,
            message: "Admin dashboard data fetched ✅",
            data: {
                customerBalance,
                deposits: depositSummary,
                withdraws: withdrawSummary,
                totalBetting,
                totalWinAmount,
                totalCommission,
                totalProfit,
                gamesData: gamesDataRows, 
            },
        });
    } catch (err) {
        console.error("Admin Dashboard Data Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error ❌",
        });
    }
};





export const editGame = async (req, res) => {
    const {
        ID,
        NAME,
        TIME1,
        TIME2,
        RTIME,
        POSITION,
        RATE,
        PAGE,
        GUESS,
        HIGHLIGHT,
        PANEL_RESULT,
        JODI_RESULT,
        DAYS,
        AUTO_GUESS,
        COLOR,
        PLAY,
        HOLIDAY,
        INACTIVE,
        REMARK2
    } = req.body;

    // console.log("➡️ Incoming body:", req.body);

    if (!ID) {
        console.log("❌ Game ID missing in request body");
        return res.status(400).json({ error: "Game ID is required" });
    }

    try {
        // Step 1: Check karo game exist karta hai ya nahi
        const [rows] = await req.db.query("SELECT * FROM games WHERE ID = ?", [ID]);
        // console.log("✅ Fetched game:", rows);

        if (rows.length === 0) {
            console.log("❌ No game found with ID:", ID);
            return res.status(404).json({ error: "Game not found" });
        }

        // Step 2: Update query
        const updateSql = `
            UPDATE games SET
                NAME = ?,
                TIME1 = ?,
                TIME2 = ?,
                RTIME = ?,
                POSITION = ?,
                RATE = ?,
                PAGE = ?,
                GUESS = ?,
                HIGHLIGHT = ?,
                PANEL_RESULT = ?,
                JODI_RESULT = ?,
                DAYS = ?,
                AUTO_GUESS = ?,
                COLOR = ?,
                PLAY = ?,
                HOLIDAY = ?,
                INACTIVE = ?,
                REMARK2 = ?
            WHERE ID = ?
        `;

        const values = [
            NAME,
            TIME1,
            TIME2,
            RTIME,
            POSITION,
            RATE,
            PAGE,
            GUESS,
            HIGHLIGHT,
            PANEL_RESULT,
            JODI_RESULT,
            DAYS,
            AUTO_GUESS,
            COLOR,
            PLAY,
            HOLIDAY,
            INACTIVE,
            REMARK2,
            ID,
        ];

        await req.db.query(updateSql, values);
        // Step 2: Fetch updated game
        const [rowss] = await req.db.query("SELECT * FROM games WHERE ID = ?", [ID]);
        const updatedGame = rowss[0];
        // console.log(updatedGame, "✅ Game updated successfully:");

        // Step 3: Re-init cronjob with new TIME1/TIME2
        scheduleCronForGame(req.db, updatedGame);

        return res.json({ message: "Game updated successfully", updatedGame });
    } catch (error) {
        console.log("❌ Server error:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

export const AddNewGame = async (req, res) => {
  try {
    const { name, time1, time2 } = req.body;

    if (!name || !time1 || !time2) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const query = "INSERT INTO games (name, time1, time2 , RESULT1, RESULT2) VALUES (?, ?, ?,?,? )";
    const [result] = await req.db.query(query, [name, time1, time2, "",""]);

    res.json({
      message: "Game added successfully",
      gameId: result.insertId,
    });
  } catch (error) {
    console.error("Error inserting game:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}





// // ✅ Approve / Cancel Deposit API
// export const approveDeposits = async (req, res) => {
//     const { method } = req.body; // "approved" | "cancelled"
//     console.log(req.body, "req body in approve deposits");
//     try {
//         let deposits = [];

//         // Single object aaya hai
//         if (!Array.isArray(req.body.deposits)) {
//             deposits = [req.body];
//         } else {
//             deposits = req.body.deposits;
//         }

//         try {
//             for (let dep of deposits) {
//                 const { ID, USER_ID, AMOUNT } = dep;

//                 if (method === "approved") {
//                     // 1️⃣ User ke wallet balance ko update karna
//                     const updateWalletSql = `
//               UPDATE users 
//               SET WALLET = WALLET + ? 
//               WHERE MOBILE = ?
//             `;
//                     await req.db.query(updateWalletSql, [parseFloat(AMOUNT), USER_ID]);
//                 }

//                 // 2️⃣ Deposit entry ka status update karna
//                 const updateDepositSql = `
//             UPDATE PAYMENT_QUEUE 
//             SET STATUS = ? 
//             WHERE ID = ?
//           `;
//                 await req.db.query(updateDepositSql, [method, ID]);
//             }

//             return res.json({
//                 success: true,
//                 message:
//                     method === "approved"
//                         ? "Deposits approved and wallet updated ✅"
//                         : "Deposits cancelled successfully ❌",
//             });
//         } catch (err) {
//             console.error("Transaction Error:", err);
//             return res.status(500).json({
//                 success: false,
//                 message: "Failed to update deposits ❌",
//             });
//         }
//     } catch (err) {
//         console.error("Approve Deposit API Error:", err);
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error ❌",
//         });
//     }
// };

// // Helper function for inserting into account table


// ✅ Approve / Cancel / Reverse Deposit API
export const approveDeposits = async (req, res) => {
  const { method } = req.body; // "approved" | "cancelled" | "reverse"
  console.log(req.body, "req body in approve deposits");
  try {
      let deposits = [];

      // Single object aaya hai
      if (!Array.isArray(req.body.deposits)) {
          deposits = [req.body];
      } else {
          deposits = req.body.deposits;
      }

      try {
          for (let dep of deposits) {
              const { ID, USER_ID, AMOUNT } = dep;

              if (method === "approved") {
                  // 1️⃣ Wallet me add karna
                  const updateWalletSql = `
                      UPDATE users 
                      SET WALLET = WALLET + ? 
                      WHERE MOBILE = ?
                  `;
                  await req.db.query(updateWalletSql, [parseFloat(AMOUNT), USER_ID]);

                  // Deposit ko approved mark karo
                  const updateDepositSql = `
                      UPDATE PAYMENT_QUEUE 
                      SET STATUS = ? 
                      WHERE ID = ?
                  `;
                  await req.db.query(updateDepositSql, [method, ID]);

                  // 3️⃣ Wallet ka latest balance fetch karo
                  const [walletRows] = await req.db.query(
                    "SELECT WALLET FROM users WHERE MOBILE = ?",
                    [USER_ID]
                );
                const latestWallet = walletRows[0]?.WALLET || 0;

               
                    // 4️⃣ Account table me entry insert karo
                    await insertAccountEntry(req.db, {
                      mobile: USER_ID,
                      paymode: "Online",
                      point: AMOUNT,
                      closing: latestWallet,
                      status: "Success"
                  });

              } 
              
              else if (method === "cancelled") {
                  // Sirf status update karna (wallet me koi change nahi)
                  const updateDepositSql = `
                      UPDATE PAYMENT_QUEUE 
                      SET STATUS = ? 
                      WHERE ID = ?
                  `;
                  await req.db.query(updateDepositSql, [method, ID]);
              } 
              
              else if (method === "reverse") {
                  // ✅ Sirf approved entries reverse karo
                  // Pehle check karo ki entry approved hai
                  const [rows] = await req.db.query(
                      "SELECT STATUS FROM PAYMENT_QUEUE WHERE ID = ?",
                      [ID]
                  );
                  
                  if (rows.length > 0 && rows[0].STATUS === "approved") {
                      // 1️⃣ Wallet se paisa minus karo
                      const updateWalletSql = `
                          UPDATE users 
                          SET WALLET = WALLET - ? 
                          WHERE MOBILE = ?
                      `;
                      await req.db.query(updateWalletSql, [parseFloat(AMOUNT), USER_ID]);

                      // 2️⃣ Status ko wapas Pending karo
                      const updateDepositSql = `
                          UPDATE PAYMENT_QUEUE 
                          SET STATUS = 'pending' 
                          WHERE ID = ?
                      `;
                      await req.db.query(updateDepositSql, [ID]);

                       // 3️⃣ Wallet ka latest balance fetch karo after deduction
                       const [walletRows] = await req.db.query(
                        "SELECT WALLET FROM users WHERE MOBILE = ?",
                        [USER_ID]
                    );
                    const latestWallet = walletRows[0]?.WALLET || 0;

                     // 4️⃣ Account table me entry insert karo for reverse
                     // 4️⃣ Account table me entry insert karo
                     await insertAccountEntry(req.db, {
                      mobile: USER_ID,
                      paymode: "Online",
                      point: AMOUNT,
                      closing: latestWallet,
                      status: "Cancelled"
                  });

                  }
              }
          }

          return res.json({
              success: true,
              message:
                  method === "approved"
                      ? "Deposits approved and wallet updated ✅ account statement created"
                      : method === "cancelled"
                      ? "Deposits cancelled successfully ❌"
                      : "Deposits reversed and set back to Pending 🔄",
          });
      } catch (err) {
          console.error("Transaction Error:", err);
          return res.status(500).json({
              success: false,
              message: "Failed to update deposits ❌",
          });
      }
  } catch (err) {
      console.error("Approve Deposit API Error:", err);
      return res.status(500).json({
          success: false,
          message: "Internal Server Error ❌",
      });
  }
};


// // ✅ Approve / Cancel Withdraw API
// export const approveWithdraws = async (req, res) => {
//     const { method } = req.body; // "approved" | "cancelled" 
//     console.log(req.body, "req body in approve withdraws");

//     try {
//         let withdraws = [];

//         // Single object aaya hai
//         if (!Array.isArray(req.body.withdraws)) {
//             withdraws = [req.body];
//         } else {
//             withdraws = req.body.withdraws;
//         }

//         try {
//             for (let wd of withdraws) {
//                 const { ID, MOBILE, AMOUNT } = wd;

//                 if (method === "approved") {
//                     // 1️⃣ Wallet balance se paisa minus karna
//                     const updateWalletSql = `
//               UPDATE users 
//               SET WALLET = WALLET - ? 
//               WHERE MOBILE = ?
//             `;
//                     await req.db.query(updateWalletSql, [parseFloat(AMOUNT), MOBILE]);
//                 }

//                 // 2️⃣ Withdraw entry ka status update karna
//                 const updateWithdrawSql = `
//             UPDATE WITHDRAW 
//             SET STATUS = ? 
//             WHERE ID = ?
//           `;
//                 await req.db.query(updateWithdrawSql, [method, ID]);
//             }

//             return res.json({
//                 success: true,
//                 message:
//                     method === "approved"
//                         ? "Withdraws approved and wallet updated ✅"
//                         : "Withdraws cancelled successfully ❌",
//             });
//         } catch (err) {
//             console.error("Transaction Error:", err);
//             return res.status(500).json({
//                 success: false,
//                 message: "Failed to update withdraws ❌",
//             });
//         }
//     } catch (err) {
//         console.error("Approve Withdraw API Error:", err);
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error ❌",
//         });
//     }
// };


// ✅ Approve / Cancel / Reverse Withdraw API
export const approveWithdraws = async (req, res) => {
  const { method } = req.body; // "approved" | "cancelled" | "reverse"
  console.log(req.body, "req body in approve withdraws");

  try {
      let withdraws = [];

      // Single object aaya hai
      if (!Array.isArray(req.body.withdraws)) {
          withdraws = [req.body];
      } else {
          withdraws = req.body.withdraws;
      }

      try {
          for (let wd of withdraws) {
              const { ID, MOBILE, AMOUNT } = wd;

              if (method === "approved") {
                  // 1️⃣ Wallet se paisa minus karna
                  // const updateWalletSql = `
                  //     UPDATE users 
                  //     SET WALLET = WALLET - ? 
                  //     WHERE MOBILE = ?
                  // `;
                  // await req.db.query(updateWalletSql, [parseFloat(AMOUNT), MOBILE]);

                  

                  // Withdraw ko approved mark karo
                  const updateWithdrawSql = `
                      UPDATE WITHDRAW 
                      SET STATUS = ? 
                      WHERE ID = ?
                  `;
                  await req.db.query(updateWithdrawSql, [method, ID]);
              } 
              
              else if (method === "cancelled") {
                  const updateWalletSql = `UPDATE users SET WALLET = WALLET + ? WHERE MOBILE = ?`;

                  await req.db.query(updateWalletSql, [parseFloat(AMOUNT), MOBILE]);
                  // Sirf status 
                  const updateWithdrawSql = `
                      UPDATE WITHDRAW 
                      SET STATUS = ? 
                      WHERE ID = ?
                  `;
                  await req.db.query(updateWithdrawSql, [method, ID]);

                  // 3️⃣ Account table me entry insert karo for cancel
                 // 3️⃣ Latest wallet fetch karo
                 const [walletRows] = await req.db.query(
                  "SELECT WALLET FROM users WHERE MOBILE = ?",
                  [MOBILE]
              );
               const latestWallet = walletRows[0]?.WALLET || 0;

               // 4️⃣ Account entry insert karo
               await insertAccountEntry(req.db, {
                mobile: MOBILE,
                paymode: "Withdraw",
                point: AMOUNT,
                closing: latestWallet,
                status: "Cancelled"
            });
              } 
              
              else if (method === "reverse") {
                  // ✅ Sirf approved withdraws ko reverse karna
                  const [rows] = await req.db.query(
                      "SELECT STATUS FROM WITHDRAW WHERE ID = ?",
                      [ID]
                  );

                  if (rows.length > 0 && rows[0].STATUS === "approved") {
                      // 1️⃣ Wallet me paisa wapas add karna
                      const updateWalletSql = `
                          UPDATE users 
                          SET WALLET = WALLET + ? 
                          WHERE MOBILE = ?
                      `;
                      await req.db.query(updateWalletSql, [parseFloat(AMOUNT), MOBILE]);

                       // 2️⃣ Withdraw record ko delete karna
                      const updateWithdrawSql = `
                          DELETE FROM WITHDRAW 
                          WHERE ID = ?
                      `;
                      await req.db.query(updateWithdrawSql, [ID]);

                      // 3️⃣ Account table me entry insert karo for reverse
                       // 3️⃣ Latest wallet fetch karo
                       const [walletRows] = await req.db.query(
                        "SELECT WALLET FROM users WHERE MOBILE = ?",
                        [MOBILE]
                    );
                    const latestWallet = walletRows[0]?.WALLET || 0;

                     // 4️⃣ Account entry insert karo
                     await insertAccountEntry(req.db, {
                      mobile: MOBILE,
                      paymode: "Withdraw",
                      point: AMOUNT,
                      closing: latestWallet,
                      status: "Cancelled"
                  });
                  }
              }
          }

          return res.json({
              success: true,
              message:
                  method === "approved"
                      ? "Withdraws approved and wallet updated ✅"
                      : method === "cancelled"
                      ? "Withdraws cancelled successfully ❌"
                      : "Withdraws reversed and set back to Pending 🔄",
          });
      } catch (err) {
          console.error("Transaction Error:", err);
          return res.status(500).json({
              success: false,
              message: "Failed to update withdraws ❌",
          });
      }
  } catch (err) {
      console.error("Approve Withdraw API Error:", err);
      return res.status(500).json({
          success: false,
          message: "Internal Server Error ❌",
      });
  }
};



const qrFolder = path.join(process.cwd(), "qrImage");

// ✅ Controller: Upload / Update QR
export const UpdateQr = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ message: "QR Image uploaded successfully", file: "qrscanner.jpg" });
};

// ✅ Controller: Get QR Image
export const GetQr = (req, res) => {
    const filePath = path.join(qrFolder, "qrscanner.jpg");
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: "QR image not found" });
    }
};


export const UpdateUPI = async (req, res) => {
    const { upiId, name } = req.body;

  if (!upiId || !name) {
    return res.status(400).json({ error: "UPI ID and name are required" });
  }

  try {
    console.log(upiId, name, "in update upi");

    const [result] = await req.db.query(
      "UPDATE SETTINGS SET gateway = ?, username = ?",
      [upiId, name]
    );

    console.log("DB result:", result);
    return res.json({ message: "UPI ID updated successfully" });
  } catch (err) {
    console.error("DB error:", err);
    return res.status(500).json({ error: "Database Error" });
  }
  };

  export const GetUPI = async (req, res) => {
    try {
        const [rows] = await req.db.query(
          "SELECT gateway AS upiId, username AS name FROM SETTINGS"
        );
    
        if (rows.length === 0) {
          return res.status(404).json({ error: "No UPI details found" });
        }
    
        return res.json(rows[0]); // { upiId: "...", name: "..." }
      } catch (err) {
        console.error("DB error in GET /upi:", err);
        return res.status(500).json({ error: "Database Error" });
      }
  }

  export const getWhatsApp = async (req, res) => {
    try {
      const [rows] = await req.db.query(
        "SELECT WHATSAPP FROM SETTINGS"
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ error: "No WhatsApp details found" });
      }
  
      return res.json({ whatsapp: rows[0].WHATSAPP });
    } catch (err) {
      console.error("DB error in GET /whatsapp:", err);
      return res.status(500).json({ error: "Database Error" });
    }
  };

  // controllers/settingsController.js
export const updateWhatsApp = async (req, res) => {
  try {
    const { whatsapp } = req.body;

    if (!whatsapp || whatsapp.trim().length < 10) {
      return res.status(400).json({ error: "Please provide a valid WhatsApp number" });
    }

    // SETTINGS table me ek hi row hai
    const [result] = await req.db.query(
      "UPDATE SETTINGS SET WHATSAPP = ? LIMIT 1",
      [whatsapp]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Settings not found" });
    }

    return res.json({ success: true, message: "WhatsApp updated successfully" });
  } catch (err) {
    console.error("DB error in POST /whatsapp:", err);
    return res.status(500).json({ error: "Database Error" });
  }
};

  
  


// export const GetAllUsers = async (req, res) => {
//     try {
//         // Users table se specific fields fetch karna
//         const [rows] = await req.db.query(
//             'SELECT id, mobile, name , wallet, refer_by, state, refer_by , password FROM users'
//         );

//         res.status(200).json(rows);
//     } catch (err) {
//         console.error('Error fetching users:', err);
//         res.status(500).json({ error: 'Failed to fetch users' });
//     }
// };


// export const AdminAddUser = async (req, res) => {
//     try {
//       const { name, phone, referby, dob, password } = req.body;

//         if (!name || !phone  || !password) {
//       return res.status(400).json({ message: "Required fields missing" });
//     }
    
//         // 1. Check if phone already exists
//         const [existingUser] = await req.db.query(
//           "SELECT * FROM users WHERE MOBILE = ?",
//           [phone]
//         );
//         if (existingUser.length > 0) {
//           return res.status(400).json({ message: "User is already registered" });
//         }
    
//         // 2. Check referby validity (if provided)
//         if (referby) {
//           if (referby === phone) {
//             return res
//               .status(400)
//               .json({ message: "ReferBy number cannot be same as user's phone" });
//           }
    
//           const [refUser] = await req.db.query(
//             "SELECT * FROM users WHERE MOBILE = ?",
//             [referby]
//           );
    
//           if (refUser.length === 0) {
//             return res
//               .status(400)
//               .json({ message: "Invalid ReferBy number. User does not exist." });
//           }
//         }
    
//         // 3. Insert into users table
//           // 3. Insert into users table
//     const query = `
//     INSERT INTO users (NAME, MOBILE, REFER_BY, PASSWORD)
//     VALUES (?, ?, ?, ?)
//   `;
//   const values = [name, phone, referby || null, password];

    
//         await req.db.query(query, values);
    
//         return res.status(200).json({ message: "User added successfully" });
//       } catch (err) {
//         console.error("Error inserting user:", err);
//         return res.status(500).json({ message: "Server error" });
//       }
// };


export const getAllBetsGameLoad = async (req, res) => {
    try {
      // SQL query to get all bets (no phone filter)
      const [bets] = await req.db.query(
        `SELECT id, number, point, type, game, game_id, DATE_FORMAT(date_time, '%Y-%m-%d %H:%i:%s') AS date_time, status, result, phone
         FROM bets
         WHERE type IN ('Jodi', 'AndarHaraf', 'BaharHaraf' , 'Manual' , 'Crossing' , 'CopyPaste' )
         ORDER BY id DESC`
      );
  
      return res.json({
        message: "All bets fetched successfully",
        bets
      });
    } catch (error) {
      console.error("Error fetching all bets:", error);
      res.status(500).json({ message: "Server error" });
    }
  };


export const updateWallet = async (req, res) => {
    try {
        const { mobile, amount, type } = req.body;

        if (!mobile || !amount || !type) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Pehle user ko find karo
        const [users] = await req.db.query("SELECT * FROM users WHERE mobile = ?", [mobile]);

        if (users.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = users[0];
        let newWallet = parseFloat(user.WALLET) || 0; // current wallet
        console.log("Current wallet:", newWallet);
        const amt = parseFloat(amount) || 0;

        if (type.toLowerCase() === "deposit") {
            newWallet += amt; // deposit -> add amount
        } else if (type.toLowerCase() === "withdraw") {
            newWallet -= amt; // withdraw -> subtract amount
            if (newWallet < 0) newWallet = 0; // if wallet goes negative
        } else {
            return res.status(400).json({ error: "Invalid type. Must be 'deposit' or 'withdraw'" });
        }

        // Update wallet in DB
        await req.db.query("UPDATE users SET wallet = ? WHERE mobile = ?", [newWallet, mobile]);

          // 5️⃣ Latest wallet fetch karo after deduction
        const [walletRows] = await req.db.query(
       "SELECT WALLET FROM users WHERE MOBILE = ?",[mobile]);

       const latestWallet = walletRows[0]?.WALLET || 0;

         // 2️⃣ Account statement me entry banao
         await insertAccountEntry(req.db, {
         mobile,
         paymode: "Online",     // fixed Online
         point: amt,            // transaction amount
         closing: latestWallet,    // latest balance after transaction
         status: "Success"      // transaction status
    });


        return res.status(200).json({
            message: `${type} successful`,
            wallet: newWallet,
            user: { id: user.id, mobile: user.mobile }
        });
    } catch (err) {
        console.error("Error updating wallet:", err);
        res.status(500).json({ error: "Failed to update wallet" });
    }
};


// UPDATE USER PASSWORD
export const AdminUpdatePassword = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({ message: "Mobile & Password required" });
    }

    const [rows] = await req.db.query(
      "SELECT * FROM users WHERE mobile = ?",
      [mobile]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    await req.db.query(
      "UPDATE users SET password = ? WHERE mobile = ?",
      [password, mobile]
    );

    return res.status(200).json({ message: "Password updated successfully" });

  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// POST /admin/toggle-user-state
export const toggleUserState = async (req, res) => {
    try {
        const { mobile } = req.body;

        if (!mobile) {
            return res.status(400).json({ error: "Mobile number is required" });
        }

        // Find user by mobile
        const [users] = await req.db.query("SELECT * FROM users WHERE mobile = ?", [mobile]);

        if (users.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = users[0];

        // Toggle state
        const newState = user.state.toLowerCase() === "active" ? "deactive" : "active";

        // Update in DB
        await req.db.query("UPDATE users SET state = ? WHERE mobile = ?", [newState, mobile]);

        return res.status(200).json({ message: "State updated successfully", state: newState });
    } catch (err) {
        console.error("Error toggling state:", err);
        res.status(500).json({ error: "Failed to update state" });
    }
};

export const declareResultList = async (req, res) => {
    try {
      // ✅ sirf required columns select kiye
      const [results] = await req.db.query(
        `SELECT 
          ID,
          GAME_ID,
          GAME_NAME,
          RESULT1,
          RESULT2,
          Jodi,
          Manual,
          andarHaraf,
          baharHaraf,
          Crossing,
          CopyPaste,
          DATE_FORMAT(DATE, '%Y-%m-%d %H:%i:%s') AS
          DATE
         FROM RESULT
         ORDER BY ID DESC`
      );
  
      return res.json({
        message: "Results fetched successfully",
        results
      });
    } catch (error) {
      console.error("Error fetching results:", error);
      res.status(500).json({ message: "Server error" });
    }
  };



export const winningReportList = async (req, res) => {
    try {
        const [rows] = await req.db.query(
          `SELECT 
             ID, 
             GAME_ID,
             DATE_TIME, 
             PHONE, 
             GAME, 
             STATUS, 
             RESULT, 
             TYPE, 
             WIN_AMOUNT 
           FROM bets 
           WHERE STATUS = 'Win'
           ORDER BY DATE_TIME DESC`
        );
    
        res.json({ success: true, results: rows });
      } catch (err) {
        console.error("Error fetching winning bets:", err);
        res.status(500).json({ success: false, message: "Server error" });
      }
  };

export const getWinningNumberold = async (req, res) => {
    const { date, gameId, result } = req.body;
  
    if (!date || !gameId || !result) {
      return res.status(400).json({
        success: false,
        message: "date, gameId and result are required ❌",
      });
    }
  
    try {
      const query = `
        SELECT 
          ID, DATE_TIME, PHONE, POINT, NUMBER, GAME_ID, GAME, TYPE , STATUS, RESULT
        FROM bets
        WHERE DATE(DATE_TIME) = ? 
          AND GAME_ID = ?
          AND RESULT = ?
      `;
  
      const [rows] = await req.db.query(query, [date, gameId, result]);
  
      return res.json({
        success: true,
        data: rows,
      });
    } catch (err) {
      console.error("Error fetching bets:", err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error ❌",
      });
    }
  };
  

  export const getWinningNumber = async (req, res) => {
    const { date, gameId, result } = req.body;
    console.log(req.body, "in get winning number");
  
    if (!date || !gameId || !result) {
      return res.status(400).json({
        success: false,
        message: "date, gameId and result are required ❌",
      });
    }
  
    try {
      // Step 1: Check if any bets exist with given RESULT
      const resultQuery = `
        SELECT  
          ID, DATE_FORMAT(DATE_TIME, '%Y-%m-%d %H:%i:%s') AS DATE_TIME, PHONE, POINT, NUMBER, GAME_ID, GAME, TYPE, STATUS, RESULT
        FROM bets
        WHERE DATE(DATE_TIME) = ?
          AND GAME_ID = ?
          AND RESULT = ?
      `;
      const [resultRows] = await req.db.query(resultQuery, [date, gameId, result]);
      console.log(resultRows, "Result rows for exact match");
  
      if (resultRows.length > 0) {
        // Only return rows where STATUS = 'win'
        const winningBets = resultRows.filter(bet => bet.STATUS === 'Win' || bet.STATUS === 'Loss' );

          // Extra check: also fetch bets where RESULT is any digit of given result
      const digits = result.split(""); // "15" => ["1","5"]

      if (digits.length > 1) {
        const placeholders = digits.map(() => "?").join(",");
        const digitQuery = `
          SELECT 
            ID, DATE_FORMAT(DATE_TIME, '%Y-%m-%d %H:%i:%s') AS DATE_TIME, PHONE, POINT, NUMBER, GAME_ID, GAME, TYPE, STATUS, RESULT
          FROM bets
          WHERE DATE(DATE_TIME) = ?
            AND GAME_ID = ?
            AND RESULT IN (${placeholders})
        `;
        const [digitRows] = await req.db.query(digitQuery, [date, gameId, ...digits]);

           // ✅ Filter digit bets also where STATUS = 'Win'
           const winningDigitBets = digitRows.filter(bet => bet.STATUS === "Win" || bet.STATUS === 'Loss');

        // Merge both exact matches + digit matches
        // (avoid duplicates if same bet appears)
        const allRows = [...winningBets, ...winningDigitBets];
        const uniqueRows = Array.from(
          new Map(allRows.map(item => [item.ID, item])).values()
        );

        return res.json({
          success: true,
          type: "matched_result_with_digits",
          data: uniqueRows,
        });
      }



        return res.json({
          success: true,
          type: "matched_result",
          data: winningBets,
        });
      }
  
      // Step 2: If no result match, check by NUMBER
      const numberQuery = `
        SELECT 
          ID, DATE_FORMAT(DATE_TIME, '%Y-%m-%d %H:%i:%s') AS DATE_TIME, PHONE, POINT, NUMBER, GAME_ID, GAME, TYPE, STATUS, RESULT
        FROM bets
        WHERE DATE(DATE_TIME) = ?
          AND GAME_ID = ?
          AND NUMBER = ?
      `;
      const [numberRows] = await req.db.query(numberQuery, [date, gameId, result]);
  
      return res.json({
        success: true,
        type: "matched_number",
        data: numberRows,
      });
  
    } catch (err) {
      console.error("Error fetching bets:", err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error ❌",
      });
    }
  };

// Add Agent (Only Admin can do this)
export const AddAgent = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    const adminRole = req.user?.role;

    // Only admin can add agents
    if (adminRole !== 'admin') {
      return res.status(403).json({ 
        message: "Only admin can add agents" 
      });
    }

    if (!name || !phone || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check if already exists
    const [existing] = await req.db.query(
      "SELECT * FROM users WHERE MOBILE = ?",
      [phone]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Agent already exists" });
    }

    // Insert agent
    await req.db.query(
      "INSERT INTO users (NAME, MOBILE, PASSWORD, role, created_by) VALUES (?, ?, ?, 'agent', ?)",
      [name, phone, password, req.user.username]
    );

    return res.status(200).json({ 
      message: "Agent added successfully" 
    });
  } catch (err) {
    console.error("Error adding agent:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update AdminAddUser to support hierarchy
export const AdminAddUser = async (req, res) => {
  try {
    const { name, phone, referby, password } = req.body;
    const userRole = req.user?.role;
    const createdBy = req.user?.username;

    if (!name || !phone || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Check permissions
    if (userRole === 'user') {
      return res.status(403).json({ 
        message: "Users cannot add other users" 
      });
    }

    // Check if phone already exists
    const [existingUser] = await req.db.query(
      "SELECT * FROM users WHERE MOBILE = ?",
      [phone]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ 
        message: "User already registered" 
      });
    }

    // Validate referby
    if (referby) {
      if (referby === phone) {
        return res.status(400).json({ 
          message: "ReferBy cannot be same as user's phone" 
        });
      }

      const [refUser] = await req.db.query(
        "SELECT * FROM users WHERE MOBILE = ?",
        [referby]
      );

      if (refUser.length === 0) {
        return res.status(400).json({ 
          message: "Invalid ReferBy number" 
        });
      }
    }

    // Insert user with role='user'
    const query = `
      INSERT INTO users (NAME, MOBILE, REFER_BY, PASSWORD, role, created_by)
      VALUES (?, ?, ?, ?, 'user', ?)
    `;
    
    await req.db.query(query, [name, phone, referby || null, password, createdBy]);

    return res.status(200).json({ 
      message: "User added successfully" 
    });
  } catch (err) {
    console.error("Error adding user:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get Users based on role hierarchy
export const GetAllUsers = async (req, res) => {
  try {
    const userRole = req.user?.role;
    const username = req.user?.username;

    let query = 'SELECT id, mobile, name, wallet, refer_by, state, IFNULL(role, "user") as role, IFNULL(created_by, "-") as created_by, password FROM users';
    let params = [];

    if (userRole === 'admin') {
      query += ' WHERE 1=1';
    } else if (userRole === 'agent') {
      query += ' WHERE created_by = ? AND IFNULL(role, "user") = "user"';
      params.push(username);
    } else {
      return res.status(403).json({ 
        error: 'Access denied' 
      });
    }

    const [rows] = await req.db.query(query, params);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};


// Get All Agents (Only for Admin)
export const GetAllAgents = async (req, res) => {
  try {
    const userRole = req.user?.role;

    if (userRole !== 'admin') {
      return res.status(403).json({ 
        error: 'Only admin can view agents' 
      });
    }

    const [rows] = await req.db.query(
      'SELECT id, mobile, name, wallet, state, IFNULL(role, "user") as role, IFNULL(created_by, "-") as created_by FROM users WHERE IFNULL(role, "user") = "agent"'
    );

    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching agents:', err);
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
};

  