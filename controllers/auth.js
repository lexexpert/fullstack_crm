const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')


module.exports.login = async function (req, res) {

    const candidate = await User.findOne({email: req.body.email})

    if(candidate){
        //check login, user exist
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if(passwordResult){
            //passwords matched, token generation
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60});
            res.status(200).json({
                token: `Bearer ${token}`
            })
        }else{
            //passwords doesn't match
            res.status(401).json({
                message: 'Incorrect password. Try again.'
            })
        }

    }else{
        //user doesn't exist, error
        res.status(404).json({
            message: 'User with this Email doesn\'t found'
        })
    }

}

module.exports.register = async function (req, res) {

    const candidate = await User.findOne({email: req.body.email})

    if(candidate){
        //User exist, show error
        res.status(409).json({
            message: 'This E-mail already exist. Try another one.'
        })

    }else{

        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password

        //Create user
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            //handle error
        }

    }
}