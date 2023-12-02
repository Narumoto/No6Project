const express = require('express');
const router = express.Router();
const Forum = require('../models/Forum');
const auth = require('../middleware/auth');

// Get all forum posts
router.get('/', async (req, res) => {
    try {
        const posts = await Forum.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one forum post
router.get('/:id', getPost, (req, res) => {
    res.json(res.post);
});

// Create one forum post
router.post('/', auth, async (req, res) => {
    const post = new Forum({
        title: req.body.title,
        content: req.body.content,
        user: req.user.id
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware function for get by ID
async function getPost(req, res, next) {
    let post;
    try {
        post = await Forum.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.post = post;
    next();
}

module.exports = router;
