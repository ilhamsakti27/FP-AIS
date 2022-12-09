const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/users");
const User = db.userModel;
const { fromString } = require('uuidv4')


exports.verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

exports.passengerPage = (req,res,next)=>{
  let passengerToken = req.session.passengerToken;
  let tokenLogin    = req.session.token
  if (!passengerToken) return res.status(403).redirect("/");
  if (!tokenLogin) return res.render("passenger");
  res.status(200).render("passenger")
  next()
}

exports.indexPage = (req,res,next)=>{
  req.session.passengerToken = null  
  let tokenLogin    = req.session.token
  if (!tokenLogin) return res.status(403).render("index");
  res.status(200).render("data/index")
  next()
}

exports.bookingPage = (req,res,next)=>{
  let passengerToken = fromString("isitujuandulu")
  req.session.passengerToken = passengerToken
  let tokenLogin    = req.session.token
  if (!tokenLogin) return res.status(403).render("booking");
  res.status(200).render("data/booking")
  next()
}