const express = require("express");
const Router = express.Router();
const CronJob = require("cron").CronJob;
const controllers = require("../controllers");
const models = require("../models/");

Router.get("/top", controllers.Question.top);

new CronJob(
    "*/1 * * * *",
//   "* * * * *",
    // "0 1 * * *",
  () => {
    models.Question.find()
      .then(questions => {
        questions = questions.sort((a, b) => {
          return (
            (b.upvotes.length -
            b.downvotes.length) -
            (a.upvotes.length - a.downvotes.length)
          );
        });
        let top = questions.splice(0, 5);
        let idTop = []
        for (let i = 0; i < top.length; i++) {
            const id = top[i]._id;
            idTop.push(id)
        }

        return models.Top.findOneAndUpdate(
          {
            status: "top"
          },
          {
            $set: {
              questions: idTop
            }
          },
          {
            new: true
          }
        );
      })
      .catch(err => {
        console.log(`
            ---------- error begin ---------
        
            ${JSON.stringify(err, null, 2)}
            
            ----------- error end ----------
          `);
      });
  },
  null,
  true,
  "Asia/Jakarta"
);

module.exports = Router;
