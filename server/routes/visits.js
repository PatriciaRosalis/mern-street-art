const express = require('express');
const StreetArt = require('../models/StreetArt');
const Visit = require('../models/Visit');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();


// Route protected for logged in user
router.get('/my-visits', isLoggedIn, (req, res, next) => {
  Visit.find({ _user: req.user._id })
    .populate('_streetArt')
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
})

// POST route => to create a new task
router.post('/visits', (req, res, next) => {

  Visit.create({
    _streetArt,
  })
    .then(response => {
      Visit.findByIdAndUpdate(req.body.projectID, { $push: { tasks: response._id } })
        .then(theResponse => {
          res.json(theResponse);
        })
        .catch(err => {
          res.json(err);
        })
    })
})

module.exports = router;