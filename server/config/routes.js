const controllers = require("../controllers");
const auth = require("../config/auth");

module.exports = (app) => {
  app.get("/", controllers.home.index);
  app.get("/about", controllers.home.about);

  app.get("/users/register", controllers.users.registerGet);
  app.post("/users/register", controllers.users.registerPost);
  app.get("/users/login", controllers.users.loginGet);
  app.post("/users/login", controllers.users.loginPost);
  app.get(
    "/users/profile/:username",
    auth.isAuthenticated,
    controllers.users.userProfile
  );
  app.get(
    "/users/dashboard/:username",
    auth.isAuthenticated,
    controllers.users.dashboard
  );
  app.post("/users/logout", controllers.users.logout);

  app.all("*", (req, res) => {
    res.render("errors/404");
  });
};
