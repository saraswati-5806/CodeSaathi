require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");

const courseRoutes = require("./routes/course.routes");
const liveClassRoutes = require("./routes/liveClass.routes");
const quizRoutes = require("./routes/quiz.routes");
const codingRoutes = require("./routes/coding.routes");

const vaultRoutes = require("./routes/vault.routes");
const aiRoutes = require("./routes/ai.routes");

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CodeSaathi API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend healthy",
    database: "MongoDB Atlas connected if server log says connected",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/live-classes", liveClassRoutes);
app.use("/api/coding", codingRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/vault", vaultRoutes);
app.use("/api/ai", aiRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 CodeSaathi backend running on http://localhost:${PORT}`);
});