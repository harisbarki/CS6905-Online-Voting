const Election = require('./election.controller');
const express = require('express');
const router = express.Router();

router.post('/create', Election.create);
router.post('/update', Election.update);
router.post('/get-all', Election.getAll);

module.exports = router;
