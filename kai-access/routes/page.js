const auth = require('../auth/authJwt')

exports.login = function(req,res) {
    res.render('login',{title:"login",message:"test"})
}

exports.register = function(req,res) {
    res.render('register')
}


exports.passenger = auth.passengerPage
exports.booking = auth.bookingPage


exports.checkout = function(req,res) {
    res.render('checkout')
}