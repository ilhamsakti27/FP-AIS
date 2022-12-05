exports.login = function(req,res) {
    res.render('login',{title:"login",message:"test"})
}

exports.register = function(req,res) {
    res.render('register')
}

exports.booking = function(req,res) {
    res.render('booking')
}

exports.passenger = function(req,res) {
    res.render('passenger')
}