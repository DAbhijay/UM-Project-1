const express   = require('express');
const router    = express.Router();
const authCTRL  = require('../controllers/authController');

router.post('/register', authCTRL.register);
router.post('/login', authCTRL.login);

module.exports = router;
