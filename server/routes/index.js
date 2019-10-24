const Router = require("express").Router();
const user = require("./user");
const question = require("./question");
const answer = require("./answer");
const cron = require("./cron");

Router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Welcome to Help Overflow"
  });
});

Router.use("/user", user);
Router.use("/question", question);
Router.use("/answer", answer);
Router.use("/cron", cron);

module.exports = Router;
