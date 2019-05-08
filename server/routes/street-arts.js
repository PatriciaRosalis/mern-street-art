// server/routes/street-arts.js
const express = require('express');
const router = express.Router();
const StreetArt = require('../models/StreetArt')
const uploader = require('../configs/cloudinary')

// Route to create a street art
// `uploader.single('picture')` parses the data send with the name `picture` and save information inside `req.file`
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

router.post('/', uploader.single('picture'), (req, res, next) => {
  let { lat, lng } = req.body
  let pictureUrl = req.file.url

  StreetArt.create({
    pictureUrl,
    location: { coordinates: [lat, lng] },
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

module.exports = router;  