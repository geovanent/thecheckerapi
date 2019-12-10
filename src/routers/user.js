const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/api/signup', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/api/update', auth, async(req, res) => {
    try {
        const { _id } = req.user;
        const { name, email, password, mailchimpapi, thecheckerapi } = req.body;
        if(password) {
            const doc = await User.findOneAndUpdate({ _id }, { name, email, password, mailchimpapi, thecheckerapi });
            res.status(201).send(doc);
        } else {
            const doc = await User.findOneAndUpdate({ _id }, { name, email, mailchimpapi, thecheckerapi });
            res.status(201).send(doc)
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/api/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        try {
            var user = await User.findByCredentials(email, password)
        } catch (error) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        user.tokens = undefined // prevent to all others tokens be sent at login
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/users/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
})

router.post('/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router