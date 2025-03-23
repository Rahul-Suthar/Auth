const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs")
const User = require("./models/User");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("viwes", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register", {error:null, success:null});
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.redirect("/login");
  } catch (error) {
    res.render("register",{ error: `Couldn't Register user ${error}`, success:null });
  }
});

app.get("/login", (req, res) => {
  res.render("login", {error:null, success:null});
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render("login", { error: "Invalid credentials", success:null });
    }
    res.render("login", {error:null, success:"login successful!" });
  } catch (error) {
    console.error("login errror : ", error);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
