const modelUser = require('../models/users')
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const User = modelUser.userModel
const jwt = require('jsonwebtoken')

exports.signup = function(req,res){
    (async () => {
        try {
            var post      = req.body;
            var email     = post.member_email;
            var username  = post.member_nama;
            var user_telp  = post.member_nohp;
            var user_id   = post.member_notandapengenal;
            var password  = post.member_pass1;
            var tipe_id   = post.member_tandapengenal;
            var tgl_lahir  = post.member_tanggallahir;
            var jenis_kelamin  = post.member_title;

            // const salt    = await bcrypt.genSalt()
            // const hashPassword = await bcrypt.hash(password, salt)
            
            if (Object.keys(email).length === 0 || Object.keys(username).length === 0 || Object.keys(password).length === 0) {
                const status =({
                    message: "Field cannot empty !",
                    status: 400
                })
                res.status(400).json(status)
                return
            }

            const newUser = await User.create({ 
                username: username,
                email: email,
                password: password,
                user_id: user_id,
                tipe_id: tipe_id,
                jenis_kelamin: jenis_kelamin,
                tgl_lahir: tgl_lahir,
                user_telp: user_telp,
            });
            const status =({
                message: "Register successfully !!",
                status: 200
            })
            console.log("New User auto-generated username:", newUser.username);
            res.json(status)
            
        } catch (error) {
            let message = error
            let flag = Object.keys(error).length === 0;
            if (flag) {
                message = "Error !! Please check field requirement"   
            } else {
                message = error.parent.sqlMessage
            }
            let status = ({
                message: message,
                status: 404
            })
            res.status(404).json(status)
            console.log(error)
        }
    })();
}

exports.login = function(req,res){
    // res.send("login")
    (async () => {
        try {
            var email = req.body.email
            var password = req.body.password
            const user = await User.findOne({
                where:
                {
                    email: email
                }
            })

            if (user){
                // const match = await bcrypt.compare(password, user.password)
                // if(!match) {
                //     res.status(400).send("Wrong password !")
                // } else {
                    // const userEmail = user.email
                    // const userPhone = user.no_telp
                    
                    // const accesToken = jwt.sign({userEmail,userPhone}, process.env.ACCESS_TOKEN_SECRET,{
                    //     expiresIn: '60s'
                    // })

                    // const refreshToken = jwt.sign({userEmail,userPhone}, process.env.REFRESH_TOKEN_SECRET,{
                    //     expiresIn: '1d'
                    // })

                    // await User.update({ refresh_token: refreshToken },{
                    //     where: {
                    //         email: userEmail
                    //     }
                    // })

                    // res.cookie('refreshToken',refreshToken,{
                    //     httpOnly: true,
                    //     maxAge  : 24 * 60 * 60 * 100
                    // })

                    // const response = ({
                    //     accesToken: accesToken,
                    //     status: 200
                    // })
                    const response = ({
                            msg: "Login Sukses",
                            status: 200
                    })
                    res.status(200).send(response)
                // }
            } else {
                const status = ({
                    message: "User not found !",
                    status: 400
                })
                res.status(400).json(status)
            }
            
        } catch (error) {
            res.status(404).send("Something error, please check the field !")
            if (error) throw error
            console.log(error)
        }
    })();
}