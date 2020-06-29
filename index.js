const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');
require('./models/user.js');
require('./services/passport_file');

mongoose.connect(keys.mongoURI);

const app = express();
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);