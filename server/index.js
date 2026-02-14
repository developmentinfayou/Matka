// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db/connection.js';
import userRoutes from './router/userRoutes.js';
import adminRoutes from './router/adminRoutes.js';
import { setupGameCronJobs } from './contollers/cronController.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use("/qrImage", express.static("qrImage"));

// Attach DB connection to every request
app.use((req, res, next) => {
    req.db = pool;
    next();
});

// Routes
app.use('/api', userRoutes);
app.use('/admin', adminRoutes);


// const getIndiaTime = (req, res) => {
//     const istTime = new Date().toLocaleString("en-IN", {
//         timeZone: "Asia/Kolkata",
//     });
//     res.json({ istTime });
// };

const getIndiaTime = (req, res) => {
  try {
        const now = new Date();

        // Force India Timezone
        const istDate = new Date(
            now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
        );

        // Format: 14/02/2026, 04:18 pm
        const day = String(istDate.getDate()).padStart(2, "0");
        const month = String(istDate.getMonth() + 1).padStart(2, "0");
        const year = istDate.getFullYear();

        let hours = istDate.getHours();
        const minutes = String(istDate.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "pm" : "am";

        hours = hours % 12;
        hours = hours ? hours : 12;
        hours = String(hours).padStart(2, "0");

        const formattedTime = `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;

        const istString =
            istDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST";

            console.log(new Date());
console.log(new Date().toString());


        res.status(200).json({
            success: true,
            formattedTime,
            istString
        });

    } catch (error) {
        console.error("Error getting India time:", error);
        res.status(500).json({ success: false, message: "Failed to get time" });
    }
}

app.get("/getIndiaTime", getIndiaTime);



// Start server after testing DB connection
const startServer = async () => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        console.log('✅ MySQL Connected:', rows[0].result);


        // 👇 Yahan cronjobs initialize kar do
        setupGameCronJobs(pool);

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ MySQL Connection Error:', err);
        process.exit(1);
    }
};

startServer();
