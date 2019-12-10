const express = require('express')
const auth = require('../middleware/auth')
const Email = require('../models/Email')
const Lists = require('../models/Lists')
const EmailResult = require('../models/EmailResult')
const axios = require('axios');

const router = express.Router()

router.get('/api/lists', auth, async(req, res) => {
    // axios.get(`https://api.thechecker.co/v2/verify?email=${req.body.email}&api_key=${req.user.thecheckerapi}`)
    axios.get(`https://us4.api.mailchimp.com/3.0/lists`, {
        auth: {
          username: "anything",
          password: req.user.mailchimpapi
        }
      })
    .then(response => {
        res.status(201).send( new Lists(response.data) )
    })
    .catch(error => {
        res.status(500).send(error)
    });
})

router.post('/api/lists/mail', auth, async(req, res) => {
    axios.get(`https://us4.api.mailchimp.com/3.0/lists/${req.body.id}/members`, {
        auth: {
          username: "anything",
          password: req.user.mailchimpapi
        }
      })
    .then(response => {
        res.status(201).send( new Email(response.data) )
    })
    .catch(error => {
        res.status(500).send(error)
    });
})

router.post('/api/lists/verify', auth, async (req, res) => {
    axios.get(`https://api.thechecker.co/v2/verify?email=${req.body.email}&api_key=${req.user.thecheckerapi}`)
    .then(response => {
        res.status(201).send( new EmailResult(response.data) )
    })
    .catch(error => {
        res.status(500).send(error)
    });
})


module.exports = router