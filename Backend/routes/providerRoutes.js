const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');

router.get('/', providerController.getProviders);
router.get('/:id', providerController.getProviderDetails);

module.exports = router;