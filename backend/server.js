const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const path = require("path");

// load .env variables
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// routes
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");

app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);


app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
