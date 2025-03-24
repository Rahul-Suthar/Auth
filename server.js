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
app.use(express.static(path.join(__dirname, "public")));

// ejs as view engine
app.set("view engine", "ejs");
app.set("viwes", path.join(__dirname, "views"));

// db connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);

// home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
