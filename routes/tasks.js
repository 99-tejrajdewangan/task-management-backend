const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// Create
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({ title, description, status, user: req.user.id });
    res.status(201).json(task);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Read list (with search/filter/pagination)
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const search = req.query.search || '';
    const status = req.query.status || 'all';

    const query = { user: req.user.id };
    if (status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.json({
      tasks,
      totalTasks: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Get single
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) return res.status(404).json({ message: 'Not found' });
    res.json(task);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Update
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) return res.status(404).json({ message: 'Not found' });

    const { title, description, status } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    await task.save();
    res.json(task);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) return res.status(404).json({ message: 'Not found' });
    await task.deleteOne(); // ✅ instead of task.remove()
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
