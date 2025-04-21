const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

router.post('/', authMiddleware, async (req, res) => {
    try {
        const newTask = new Task({
            userId: req.user._id,
            title: req.body.title,
        });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ error: 'Error creating task' });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updated = await Task.findOneAndUpdate(
            {_id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );

        if(!updated) return res.status(404).json({ error: "Task not found" });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Error updating task' });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const deleted = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!deleted) return res.status(404).json({ error: "Task not found" });
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting task' });
    }
});

module.exports = router;