require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// Packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// DB
const connectDB = require("./db/connect");

// Routers
const authRouter = require("./Routes/authRoutes");
const userRouter = require("./Routes/userRoutes");
const { authMiddleware } = require("./middleware/authentication");

// Middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));

// Import Middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// app.use("/", (req, res) => {
//   res.send("<h1>E Commerce Starter</h1>");
// });

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authMiddleware, userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log("From video 33 : " + port);
    });
  } catch (error) {
    console.log("Failed to connect..");
  }
};

start();
