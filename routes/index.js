var express = require('express');
var router = express.Router();
const passport = require("passport");
const User = require("../models/user");
var bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
  console.log(req.user)
});

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/", session: false
  })
);

router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/sign-up", (req, res) => res.render("sign-up-form"));
router.post("/sign-up", async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      // if err, do something
      // otherwise, store hashedPassword in DB
    });
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    const result = await user.save();
    res.redirect("/");
  } catch (err) {
    return next(err);
  };
});

module.exports = router;
