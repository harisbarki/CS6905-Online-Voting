const Election = require('./election.controller');
const express = require('express');
const router = express.Router();

router.get('/', Election.getElections);
router.post('/', Election.create);
router.patch('/', Election.update);
router.delete('/', Election.delete);

module.exports = router;
