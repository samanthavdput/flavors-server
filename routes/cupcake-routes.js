const express = require('express');
const mongoose = require('mongoose');
const Cupcake = require('../models/cupcake-model');
const Flavorlist = require('../models/flavorlist-model');
 
const router = express.Router();
 
// GET route => to retrieve a specific cupcake
router.get('/flavorlists/:id/cupcakes/:cupcakeId', (req, res, next) => {
  Cupcake.findById(req.params.cupcakeId)
    .then(cupcake => {
      res.json(cupcake);
    })
    .catch(error => {
      res.json(error);
    });
});
 
// POST route => to create a new cupcake
router.post('/cupcakes', (req, res, next) => {
  Cupcake.create({
    name: req.body.name,
    description: req.body.description,
    ingredients: req.body.ingredients,
    imageUrl: req.body.imageUrl,
    flavorlist: req.body.flavorlistID
  })
    .then(newCupcake => {
      return Flavorlist.findByIdAndUpdate(req.body.flavorlistID, {
        $push: { cupcakes: newCupcake._id }
      });
    })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});
 
// PUT route => to update a specific cupcake
router.put('/flavorlists/:id/cupcakes/:cupcakeId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Cupcake.findByIdAndUpdate(req.params.cupcakeId, req.body)
    .then(() => {
      res.json({ message: `Cupcake with ${req.params.cupcakeId} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    });
});
 
// DELETE route => to delete a specific cupcake
router.delete('/flavorlists/:id/cupcakes/:cupcakeId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Cupcake.findByIdAndRemove(req.params.cupcakeId)
    .then(() => {
      res.json({ message: `Cupcake with ${req.params.cupcakeId} is removed successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});
 
module.exports = router;