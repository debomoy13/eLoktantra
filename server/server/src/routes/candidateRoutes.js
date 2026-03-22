const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

router.get('/', candidateController.getAllCandidates);
router.get('/:electionId', candidateController.getCandidates);

module.exports = router;
