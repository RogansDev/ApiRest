const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const Keys = require("../config/Keys");

module.exports = {


    login(req, res){
       
        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async(err, myUser) => {

            console.log('Error',err)
            console.log('USUARIO', myUser)
             
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro usuario',
                    error: err 
                })
            }

            if(!myUser) {
                return res.status(401).json({
                    success: false,
                    message: "el email no fue encontrado"
                })
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if(isPasswordValid){
                const token = jwt.sign({id: myUser.id, email: myUser.email}, Keys.secretOrKey, {});

                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastName: myUser.lastName,
                    email: myUser.email,
                    document: myUser.document,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`
                } 

                return res.status(201).json({
                    success: true,
                    message: 'El usuario con exito',
                    data: data
                })
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: "el password es incorrecto"
                })
            }

         })

        },

    register(req, res) {
        const user = req.body;
        User.create(user, (err, myUser) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro usuario',
                    error: err 
                })
            }

            return res.status(201).json({
                success: true,
                message: 'El registro se relizo con exito',
                myUser: myUser
            })
        })

    }
}