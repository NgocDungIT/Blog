const express = require('express');
const {
    getHomeAdmin,
    getRegister,
    logIn,
    logOut,
    checkLogin,
    crateUser,
    getAdminDashboard,
    getCreatePost,
    getEditPost,
} = require('../controller/admin.controller');

const router = express.Router();

router.route('/').get(getHomeAdmin).post(logIn);
router.route('/logout').get(logOut);
router.route('/register').get(getRegister).post(crateUser);
router.route('/dashboard').get(checkLogin, getAdminDashboard);
router.route('/add-post').get(getCreatePost);
router.route('/edit-post/:id').get(getEditPost);

module.exports = router;
