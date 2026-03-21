const express   = require('express');
const router    = express.Router();
const authCTRL  = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authCTRL.register);
router.post('/login', authCTRL.login);
router.get('/me', authMiddleware, authCTRL.getProfile);
router.post('/complete-provider-profile', authMiddleware, authCTRL.completeProviderProfile);

module.exports = router;
