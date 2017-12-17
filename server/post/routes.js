const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = require('./models');

// Routed as: /api/posts;
const ROUTE = 'posts';

router.get('/', (req, res, next) => {
  Post.find()
    .exec()
    .then((post) => res.json(post))
    .catch((err) => next(err));
});

router.get('/:id', (req, res, next) => {
  Post.find()
    .exec()
    .then((post) => res.json(post))
    .catch((err) => next(err));
});

router.post('/', (req, res, next) => {
  const { author, comment } = req.body;
  const post = new Post({
    author,
    comment,
  });

  post.save()
    .then(() => res.json(post))
    .catch((err) => next(err));
});

router.delete('/:id', (req, res, next) => {
  Post.findOneAndRemove({ _id: req.params.id })
    .exec()
    .then((post) => res.json())
    .catch((err) => next(err));
});

router.put('/:id', (req, res, next) => {
  const { author, comment } = req.body;

  Post.findById(req.params.id)
    .exec()
    .then((post) => {
      post.author = req.author;
      post.comment = req.comment;

      post.save()
        .then(() => res.json(post))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

module.exports = router;
module.exports.ROUTE = ROUTE;
