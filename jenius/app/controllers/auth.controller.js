const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Order = db.order;
const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      no_hp: req.body.no_hp,
      username: req.body.username,
      nik: req.body.nik,
      pin: req.body.pin,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      const result = user.setRoles(roles);
      if (result) res.send({ message: "User registered successfully!" });
    } else {
      // user has role = 1
      const result = user.setRoles([1]);
      if (result) res.send({ message: "User registered successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        no_hp: req.body.no_hp,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id, phone: user.no_hp }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    req.session.token = token;

    return res.status(200).send({
      msg:"Logged in",
      id: user.id,
      username: user.username,
      email: user.email,
      saldo: user.saldo,
      roles: authorities,
      status:200,
      token: req.session.token
    });
    
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.topup = async (req, res) => {

  try {
        const user = await User.findOne({
          where: {
            no_hp: req.body.no_hp,
          },
        });
    
    if(!user) return res.status(404).json({message: "Invalid phone number !",status:404})
    if(user.pin != req.body.pin) return res.status(404).json({message: "Invalid pin !",status:404})

    let amount = req.body.amount
    let saldoAwal = user.saldo
    let saldoTopup = +user.saldo + +amount

    await User.update({saldo:saldoTopup},{
      where:{no_hp: req.body.no_hp}
    })

    let response = {
      status:200,
      msg: "Topup",
      saldo : saldoAwal,
      topup : saldoTopup
    }
    
    res.json(response)
  } catch (error) {
    return res.status(500).json({ message: error.message,status:500 });
  }

};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};


exports.payment = async (req,res) => {
  
  try {
    let no_hp = req.body.no_hp
    let total = req.body.total
    
    let user = await User.findOne({where:{no_hp:no_hp}})
    if(!user)return res.status(404).send("User not found !")
    if(user.pin != req.body.pin) return res.status(400).json({message: "Invalid pin !",status:404})
    
    let saldo = user.saldo
    if( saldo < total ) return res.status(400).json({"message":"Saldo kurang !"})
    let saldoSisa = saldo - total

    const kode = guidGenerator()

    await User.update({saldo:saldoSisa},{where:{no_hp:no_hp}})
    const order = await Order.create({  
      kode_bayar: kode,
      no_hp: req.body.no_hp,
      username: user.username,
      total: req.body.total,
    });

    res.status(200).json({"status":200,"message":"Payment sukses !","total":total,"saldo":saldoSisa,"kode":kode})

  } catch (error) {
    res.status(500).send(error)
  }
}
function guidGenerator() {
  var S4 = function() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}