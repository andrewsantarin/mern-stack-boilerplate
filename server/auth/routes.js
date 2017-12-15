const express = require('express');
const router = express.Router();

/* POST login */
router.post('/sign-in', (req, res, next) => {
  const { username } = req.body;
  const isAuthenticated = true;

  res.json({
    username,
    isAuthenticated,
  });
});

/* POST register */
router.post('/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  res.json({
    username,
    password,
    msg: 'Thank you for signing up!',
    id: 1,
  });
});

module.exports = router;
