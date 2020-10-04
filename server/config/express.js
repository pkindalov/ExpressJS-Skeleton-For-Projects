const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const expressHandlebars = require('express-handlebars');
const handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

module.exports = (app) => {
    app.engine('handlebars', expressHandlebars({
        defaultLayout: 'main',
        handlebars: allowInsecurePrototypeAccess(handlebars)
    }));
    app.set('view engine', 'handlebars');
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session({
        secret: 'neshto-taino!@#$%',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user;
            res.locals.isAdmin = req.user.roles.indexOf('Admin') >= 0;
            // console.log(req.user._doc.firstName)
            // console.log(req.user.firstName)
            // console.log('debug')
        }

        next();
    });

    app.use(express.static('public'));

    console.log('Express ready!');
}