const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const handlebars = require("handlebars");
const { engine } = require("express-handlebars");
const { randomBytes } = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

module.exports = (app) => {
  app.engine("handlebars", engine({ defaultLayout: "main", handlebars }));
  app.set("view engine", "handlebars");
  app.use(cookieParser());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  const secretWord = process.env.SECRET
    ? process.env.SECRET
    : randomBytes(32).toString("hex");

  app.use(
    session({
      secret: secretWord,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = { ...req.user._doc };
      res.locals.isAdmin = req.user.roles.indexOf("Admin") >= 0;
    }

    next();
  });

  app.use(express.static("public"));

  console.log("Express ready!");
};
