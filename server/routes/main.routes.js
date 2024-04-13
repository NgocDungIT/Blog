const express = require('express');
const {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    searchTerm,
    getAbout,
    getContact,
} = require('../controller/post.controller');

const router = express.Router();

router.route('/').get(getAllPosts).post(createPost);
router.route('/search').post(searchTerm);
router.route('/about').get(getAbout);
router.route('/contact').get(getContact);
router.route('/:id').get(getPost).put(updatePost).delete(deletePost);

module.exports = router;
