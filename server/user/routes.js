const express = require('express');
const router = express.Router();

// Routed as: /api/users;
const ROUTE = 'users';

const USERS = {
  1: {
    id: 1,
    username: "samsepi0l"
  }, 
  2: {
    id: 2,
    username: "D0loresH4ze"
  },
};

router.get('/', (req, res, next) => {
  res.json(USERS);
});

router.get('/:id', (req, res, next) => {
  res.json(USERS[req.params.id] || {});
});

module.exports = router;
module.exports.ROUTE = ROUTE;
