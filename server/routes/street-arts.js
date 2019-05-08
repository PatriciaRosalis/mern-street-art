// server/routes/street-arts.js
const express = require('express');
const router = express.Router();
const StreetArt = require('../models/StreetArt')

router.post('/', (req, res, next)=>{
  Project.create({
    lat: req.body.lat,
    lng: req.body.lng,
    picture: req.body.picture,
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

router.get('/', (req, res, next) => {
  StreetArt.find()
  .then(Street => {
    res.json(Street);
  })
  .catch(err => next(err))
});

router.get('/:streetArtId', (req, res, next) => {
  StreetArt.findById(req.params.streetArtId)
  .then(street => {
    res.json(street)
  })
  .catch(err => next(err))
});


module.exports = router;  