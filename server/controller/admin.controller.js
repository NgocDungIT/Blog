const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('../models/post.model');
const User = require('../models/user.model');

const adminLayout = '../views/layouts/admin';

exports.getHomeAdmin = async (req, res) => {
    try {
        const locals = {
            title: 'Admin',
            description: 'Simple Blog created with NodeJS, Express and MongoDB',
        };

        res.render('admin/index', { locals, layout: adminLayout });
    } catch (err) {
        console.error(err.message);
    }
};

exports.logIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        if (!user)
            return res.status(401).json({
                message: 'Account or password is incorrect',
            });

        const isCheckPassword = await bcrypt.compare(password, user.password);

        if (!isCheckPassword)
            return res.status(401).json({
                message: 'Account or password is incorrect',
            });

        const token = jwt.sign({ data: user }, process.env.SECRET_JWT, {
            expiresIn: '1h',
        });

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err.message);
    }
};

exports.checkLogin = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.redirect('/admin');

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        req.user = decoded.user;
        next();
    } catch (err) {
        // err
        return res.redirect('/admin');
    }
};

exports.logOut = async (req, res) => {
    try {
        res.clearCookie();

        res.redirect('/admin');
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

exports.getRegister = async (req, res) => {
    try {
        const locals = {
            title: 'Admin Register',
            description: 'Simple Blog created with NodeJS, Express and MongoDB',
        };

        res.render('admin/register', { locals, layout: adminLayout });
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

exports.crateUser = async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    if (password === confirmPassword) {
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({
                username: username,
                password: hashedPassword,
            });

            // res.status(201).json({
            //     message: 'User created successfully',
            //     user: user,
            // });
            res.redirect('/admin');
        } catch (err) {
            if (err.code === 11000)
                return res.status(409).json({
                    message: 'User already in use',
                });
            return res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    } else {
        res.status(500).json({
            message: 'Please enter matching password',
        });
    }
};

exports.getAdminDashboard = async (req, res) => {
    try {
        const locals = {
            title: 'Admin Dashboard',
            description: 'Simple Blog created with NodeJS, Express and MongoDB',
        };

        const data = await Post.find();
        res.render('admin/dashboard', { locals, data, layout: adminLayout });
    } catch (err) {
        console.error(err.message);
    }
};

exports.getCreatePost = async (req, res) => {
    try {
        const locals = {
            title: 'Create Post',
            description: 'Simple Blog created with NodeJS, Express and MongoDB',
        };

        res.render('admin/add-post', { locals, layout: adminLayout });
    } catch (err) {
        console.error(err.message);
    }
};

exports.getEditPost = async (req, res) => {
    try {
        const locals = {
            title: 'Edit Post',
            description: 'Simple Blog created with NodeJS, Express and MongoDB',
        };

        const post = await Post.findById(req.params.id);

        res.render('admin/edit-post', { locals, post, layout: adminLayout });
    } catch (err) {
        console.error(err.message);
    }
};
