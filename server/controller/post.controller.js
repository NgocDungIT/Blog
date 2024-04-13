const Post = require('../models/post.model');

exports.getAllPosts = async (req, res) => {
    try {
        const locals = {
            title: 'Blog',
            description: 'Simple Blog created with NodeJS, Express and MongoDB',
        };

        // Pagination
        let perPage = 3;
        let page = req.query.page || 1;

        let data = await Post.find()
            .skip(perPage * (page - 1))
            .limit(perPage)
            .sort('-createdAt');

        const countPosts = await Post.count();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(countPosts / perPage);

        res.render('index', {
            locals,
            data,
            currentPage: page,
            nextPage: hasNextPage ? nextPage : null,
        });
    } catch (err) {
        console.error(err);
    }
};

exports.getPost = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Post.findById({ _id: id });

        const locals = {
            title: data.title,
            body: data.body,
        };

        res.render('post', { locals, data });
    } catch (err) {
        console.error(err);
    }
};

exports.createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);

        res.redirect('admin/dashboard');
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.updatePost = async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updateAt: Date.now(),
        });

        res.redirect(`/post/${req.params.id}`);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);

        return res.redirect('/admin/dashboard');
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.searchTerm = async (req, res) => {
    try {
        const locals = {
            title: 'Search',
            description: 'Simple Blog created with NodeJS, Express and MongoDB',
        };

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '');

        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
            ],
        });

        res.render('search', { locals, data });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.getAbout = async (req, res) => {
    try {
        const locals = {
            title: 'About',
            description: 'Simple Blog created with NodeJS, Express and MongoDB',
        };

        res.render('about', { locals });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

exports.getContact = async (req, res) => {
    try {
        const locals = {
            title: 'Contact',
            description: 'Simple Blog created with NodeJS, Express and MongoDB',
        };

        res.render('contact', { locals });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
