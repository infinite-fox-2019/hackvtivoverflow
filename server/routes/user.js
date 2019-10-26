const Router = require("express").Router();
const controllers = require("../controllers/");
const authentication = require("../middlewares/authentication");

Router.post("/register", controllers.User.register);
Router.post("/login", controllers.User.login);

Router.use(authentication);
Router.get("/getTags", controllers.User.getTags);
Router.post("/pushTag", controllers.User.pushTag);
Router.post("/pullTag", controllers.User.pullTag);

module.exports = Router;
