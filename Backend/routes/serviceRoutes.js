const express       = require('express');
const router        = express.Router();
const authMW        = require('../middleware/authMiddleware');
const roleMW        = require('../middleware/roleMiddleware');
const serviceCtrl   = require('../controllers/serviceController');

router.use(authMW);

// ── Customer endpoints ──────────────────────────────────────

router.post('/', serviceCtrl.createRequest);
router.get('/', serviceCtrl.getMyRequests);
router.patch('/:id/accept', serviceCtrl.getRequestById);

// ── Provider endpoints ──────────────────────────────────────

router.put('/:id/status', roleMW('provider'), serviceCtrl.updateStatus);

module.exports = router;