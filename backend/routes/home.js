const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        // Use complete user object from JWT (already verified by authMiddleware)
        const { password, __v, ...userData } = req.user;
        res.json({
            message: "Welcome to the Dashboard! 🎉",
            user: userData
        });
    } catch (err) {
        console.error("Error in home route:", {
            message: err.message,
            stack: err.stack,
            userObject: req.user // Log the decoded user object
        });
        res.status(500).json({ 
            error: "Server error",
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
});

module.exports = router;