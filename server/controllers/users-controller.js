const encryption = require("../utilities/encryption");
const User = require("mongoose").model("User");
const errorHandler = require("../utilities/error-handler");

module.exports = {
  registerGet: (req, res) => {
    res.render("users/register");
  },

  registerPost: (req, res) => {
    const reqUser = req.body;

    // add validations
    // (if reqUser.username.length < 3)...

    const salt = encryption.generateSalt();
    const hashedPassword = encryption.generateHashedPassword(
      salt,
      reqUser.password
    );

    User.create({
      username: reqUser.username,
      firstName: reqUser.firstName,
      lastName: reqUser.lastName,
      salt: salt,
      hashedPass: hashedPassword,
    }).then((user) => {
      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalError = err;
          res.render("users/register", user);
        }
        res.redirect("/");
      });
    });
  },
  loginGet: (req, res) => {
    res.render("users/login");
  },

  loginPost: (req, res) => {
    const reqUser = req.body;
    User.findOne({
      username: reqUser.username,
    }).then((user) => {
      if (!user) {
        res.locals.globalError = "Invalid user data";
        res.render("users/login");
        return;
      }

      if (!user.authenticate(reqUser.password)) {
        res.locals.globalError = "Invalid user data";
        res.render("users/login");
        return;
      }

      req.logIn(user, (err, user) => {
        if (err) {
          res.locals.globalError = err;
          res.render("users/login");
        }

        res.redirect("/");
      });
    });
  },

  userProfile: (req, res) => {
    const username = req.params.username ?? "Guest";
    res.render("users/profile", { username });
  },

  dashboard: (req, res) => {
    const username = req.params.username ?? "Guest";
    res.render("users/dashboard", { username });
  },

  logout: (req, res) => {
    req.logout((err) => {
      if (err) console.log(err);
      res.redirect("/");
    });
  },
};
