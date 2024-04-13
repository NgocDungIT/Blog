const express = require('express');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const connectDB = require('./server/config/connectDB');
const mainRoute = require('./server/routes/main.routes');
const adminRoute = require('./server/routes/admin.routes');

const PORT = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(
    session({
        secret: 'ngocdung697402',
        saveUninitialized: false,
        resave: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URL,
            ttl: 14 * 24 * 60 * 60, // = 14 days.
        }),
    })
);

// Teamplating Engine
app.use(expressLayout);
app.set('layout', path.join(__dirname, './views/layouts/main'));
app.set('view engine', 'ejs');

app.use('/post', mainRoute);
app.use('/admin', adminRoute);

app.listen(PORT, () => {
    connectDB(process.env.MONGODB_URL);
    console.log(`listening on http://localhost:${PORT}/post`);
});
