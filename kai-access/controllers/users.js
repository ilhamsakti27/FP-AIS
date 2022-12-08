const modelUser = require('../models/users')
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const User = modelUser.userModel
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");

exports.signup = function(req,res){
    (async () => {
        try {
            var post      = req.body;
            var email     = post.member_email;
            var username  = post.member_nama;
            var user_telp  = post.member_nohp;
            var id   = post.member_notandapengenal;
            var password  = post.member_pass1;
            var tipe_id   = post.member_tandapengenal;
            var tgl_lahir  = post.member_tanggallahir;
            var jenis_kelamin  = post.member_title;

            console.log(id)
            // const salt    = await bcrypt.genSalt()
            const hashPassword = await bcrypt.hashSync(password, 8)
            
            const user = await User.findOne({where:{user_id:id}})
            if(user) return res.status(400).json({message:`[User_id]: ${id} already exist !`}) 
            const isEmailExist = await User.findOne({where:{email:email}})
            if(isEmailExist) return res.status(400).json({message:`[Email]: ${email} already exist !`}) 

            const newUser = await User.create({ 
                username: username,
                email: email,
                password: hashPassword,
                user_id: id,
                tipe_id: tipe_id,
                jenis_kelamin: jenis_kelamin,
                tgl_lahir: tgl_lahir,
                user_telp: user_telp,
            });

            const status =({
                message: "Register successfully !!",
                username: `${newUser.username}`,
                status: 200
            })
            res.json(status)
            
        } catch (error) {
            console.log(error)
            let status = ({
                message: error,
                status: 404
            })
            res.status(404).json(status)
        }
    })();
}

exports.login = function(req,res){
    (async () => {
        try {
            var email = req.body.email
            var password = req.body.password
            
            const user = await User.findOne({where:{email: email}})
            if (!user) return res.status(400).json({message:"User not found !"})
            const match = await bcrypt.compareSync(password, user.password)    
            if(!match) return res.status(400).json({message:"Wrong Password !"})
            
            const db_username = user.username
            const db_email    = user.email
            const token = jwt.sign({id:db_username}, config.secret, {
                expiresIn: 86400, // 24 hours
            });
            console.log(token)
            req.session.token = token;

            res.status(200).json({message:"Login Sukses !",token:token,status:200})

        } catch (error) {
            res.status(400).json({message:error})
            console.log(error)            
        }
    })();
}

exports.logout = async(req,res)=>{
    try {
        req.session = null 
        return res.status(200).json({
            message: "You've been signed out!",
            status:200
        });
    } catch (error) {
        res.status(400).send(error)
    }
}