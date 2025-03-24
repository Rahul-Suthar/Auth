const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const router = express.Router();

router.get("/register", (req, res) => {
    res.render("register", {error:null, success:null});
});


router.post("/register", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = new User({ username, password });
      await user.save();
      res.redirect("/auth/login");
    } catch (error) {
      res.render("register",{ error: `Couldn't Register user ${error}`, success:null });
    }
});
  
router.get("/login", (req, res) => {
    res.render("login", {error:null, success:null});
});
  
router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.render("login", { error: "Invalid credentials", success:null });
      }
      res.redirect("/dashboard");
    } catch (error) {
      res.status(500).send("Server error");
    }
});

module.exports = router;