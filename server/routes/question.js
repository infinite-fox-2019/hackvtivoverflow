const Router = require("express").Router();
const controllers = require("../controllers/");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

Router.get("/all", controllers.Question.all);
Router.get("/getByTag/:tag", controllers.Question.getByTag);
Router.get("/show/:id", controllers.Question.show);

Router.use(authentication);
Router.post("/create", controllers.Question.store);
Router.get("/my", controllers.Question.my);
Router.delete("/:id", authorization.question, controllers.Question.delete);
Router.patch("/:id", authorization.question, controllers.Question.edit);

Router.post("/upvote", controllers.Question.upvote);
Router.post("/downvote", controllers.Question.downvote);

module.exports = Router;
