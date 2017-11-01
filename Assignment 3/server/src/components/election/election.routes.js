const Election = require('./election.controller');
const express = require('express');
const router = express.Router();

router.post('/create', Election.create);
router.post('/update', Election.update);
router.get('/get-all', Election.getAll);

module.exports = router;
