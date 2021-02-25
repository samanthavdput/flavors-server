const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
 
const Flavorlist = require('../models/flavorlist-model');
const Cupcake = require('../models/cupcake-model');
 
// GET route => to get all the flavorlists
router.get('/flavorlists', (req, res, next) => {
  Flavorlist.find()
    .populate('cupcakes')
    .then(allTheFlavorlists => {
      res.json(allTheFlavorlists);
    })
    .catch(err => {
      res.json(err);
    });
});


// POST route => to create a new flavorlist
router.post('/flavorlists', (req, res, next)=>{
  Flavorlist.create({
    title: req.body.title,
    description: req.body.description,
    cupcakes: [],
    owner: req.user._id,
    imageUrl: req.body.imageUrl,
  })
  .then(response => {
  res.json(response);
  })
  .catch(err => {
  res.json(err);
  })
});

// GET route => to get a specific flavorlit/detailed view
router.get('/flavorlists/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 

  Flavorlist.findById(req.params.id)
    .populate('cupcakes')
    .then(flavorlist => {
      res.status(200).json(flavorlist);
    })
    .catch(error => {
      res.json(error);
    });
});
 
// PUT route => to update a specific flavorlist
router.put('/flavorlists/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Flavorlist.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Flavorlist with ${req.params.id} is updated successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});
 
// DELETE route => to delete a specific list
router.delete('/flavorlists/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Flavorlist.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Flavorlist with ${req.params.id} is removed successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});



module.exports = router;