const models = require("../models");
const bcrypt = require("../helpers/bcrypt");
const jwt = require("../helpers/jwt");

if (process.env.NODE_ENV === "development") require("dotenv").config();

class User {
  static register(req, res, next) {
    const { name, email, password } = req.body;
    models.User.create({
      name,
      email,
      password
    })
      .then(user => {
        const payload = {
          _id: user._id,
          name: user.name,
          email: user.email
        };

        let token = jwt.generate(payload);
        res.status(201).json({
          message: "Register Success",
          type: "success",
          token
        });
      })
      .catch(next);
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    models.User.findOne({
      email
    })
      .then(user => {
        if (!user || !bcrypt.compare(password, user.password)) {
          next({
            httpStatus: 400,
            msg: `invalid username / password !`
          });
        } else {
          const payload = {
            _id: user._id,
            name: user.name,
            email: user.email
          };

          let token = jwt.generate(payload);
          res.status(200).json({
            message: "Login Success",
            type: "success",
            token
          });
        }
      })
      .catch(next);
  }

  static getTags(req, res, next) {
    let id = req.decode._id;

    models.User.findById(id)
      .then(user => {
        res.status(200).json(user.tags);
      })
      .catch(next);
  }

  static pushTag(req, res, next) {
    let id = req.decode._id;

    models.User.findByIdAndUpdate(id, {
      $addToSet: { tags: req.body.tag }
    })
      .then(() => {
        res.status(200).json({
          message: "watch successfully"
        });
      })
      .catch(next);
  }

  static pullTag(req, res, next) {
    let id = req.decode._id;

    models.User.findByIdAndUpdate(id, {
      $pull: { tags: { $in: [req.body.tag] } }
    })
      .then(() => {
        res.status(200).json({
          message: "unwatch successfully"
        });
      })
      .catch(next);
  }
}

module.exports = User;
