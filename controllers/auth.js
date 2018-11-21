const bcrypt = require('bcryptjs')
const User = require('../models/User')


module.exports.login = function (req, res) {
    res.status(200).json({
        email: req.body.email,
        password: req.body.password
    })
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

        //user.save().then(() => console.log('User created'))
    }
}