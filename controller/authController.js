const express = require ('express');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');

const User = require ('../models/user');

const router = express.Router();

const authConfig = require ('../config/authenticate.json')

function generateToken (params = {} ) {
    return jwt.sign ({ params}, authConfig.secret, {
        expiresIn: 1800, 
    });
}

router.post('/register', async (req, res) => {
    const { email } = req.body;

    try {
        if ( await User.findOne( { email })) {
            res.status(400).send({error: 'E-mail já existente'})
        }
        const user = await User.create(req.body);

        return res.send({ user, token: generateToken({ id: user.id}) })

    } catch (err) {
        return res.status(400).send({error: "Registration failed"})
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne( {email}).select('+password');

    if (!user) {
        return res.status(401).send({error: "Usuário e/ou senha inválidos"})
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(401).send({error: "Usuário e/ou senha inválidos"})
    }

    let updateAt = Date.now();

    await user.updateOne ( {_id: user.id , updateAt : updateAt } );

    res.send( { user, token: generateToken({ id: user.id}) });
})

module.exports = app => app.use('/auth', router);