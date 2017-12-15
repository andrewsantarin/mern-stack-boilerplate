const express = require('express');
const router = express.Router();

const Counter = require('./models');

// Routed as: /api/counters;
const ROUTE = 'counters';

router.get('/', (req, res, next) => {
  Counter.find()
    .exec()
    .then((counter) => res.json(counter))
    .catch((err) => next(err));
});

router.post('/', function (req, res, next) {
  const counter = new Counter();

  counter.save()
    .then(() => res.json(counter))
    .catch((err) => next(err));
});

router.delete('/:id', function (req, res, next) {
  Counter.findOneAndRemove({ _id: req.params.id })
    .exec()
    .then((counter) => res.json())
    .catch((err) => next(err));
});

router.put('/:id/increment', (req, res, next) => {
  Counter.findById(req.params.id)
    .exec()
    .then((counter) => {
      counter.count++;

      counter.save()
        .then(() => res.json(counter))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

router.put('/:id/decrement', (req, res, next) => {
  Counter.findById(req.params.id)
    .exec()
    .then((counter) => {
      counter.count--;

      counter.save()
        .then(() => res.json(counter))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

module.exports = router;
module.exports.ROUTE = ROUTE;
