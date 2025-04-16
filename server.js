// const express = require("express");
// const app = express();
// const cors = require("cors");
// require("dotenv").config();
// const conn = require("./connection/connection");
// const cors = require('cors');
// app.use(cors());

// const allowedOrigins = [
//   "http://localhost:5173","https://module-5-frontend-x93h.vercel.app"
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("CORS not allowed from this origin"));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );


// app.use(express.json());

// conn()
//   .then(() => {
//     console.log("MongoDB connected successfully");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   });

// const auth = require("./routes/auth");
// const todoRoutes = require("./routes/todo");

// app.get("/", (req, res) => {
//   res.send("Backend server is running");
// });

// app.use("/api/v1/auth", auth);
// app.use("/api/v1/todos", todoRoutes);

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Something went wrong!" });
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const app = express();
const cors = require("cors"); // ✅ Only one import
require("dotenv").config();
const conn = require("./connection/connection");

const allowedOrigins = [
  "http://localhost:5173",
  "https://module-5-frontend-x93h.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed from this origin"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

conn()
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const auth = require("./routes/auth");
const todoRoutes = require("./routes/todo");

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

app.use("/api/v1/auth", auth);
app.use("/api/v1/todos", todoRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
