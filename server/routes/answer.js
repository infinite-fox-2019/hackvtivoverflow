const Router = require("express").Router();
const controllers = require("../controllers/");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

Router.get("/show/:id", controllers.Answer.show);

Router.use(authentication);
Router.post("/create", controllers.Answer.create);
Router.post("/upvote", controllers.Answer.upvote);
Router.post("/downvote", controllers.Answer.downvote);

Router.get("/my", controllers.Answer.my);

Router.delete("/:id", authorization.answer, controllers.Answer.delete);
Router.patch("/:id", authorization.answer, controllers.Answer.edit);

module.exports = Router;
