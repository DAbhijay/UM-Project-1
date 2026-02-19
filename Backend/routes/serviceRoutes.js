const express       = require('express');
const router        = express.Router();
const authMW        = require('../middleware/authMiddleware');
const roleMW        = require('../middleware/roleMiddleware');
const serviceCtrl   = require('../controllers/serviceController');

// ── Customer endpoints ──────────────────────────────────────

router.post('/', authMW, serviceCtrl.createRequest);
router.post('/', authMW, serviceCtrl.getMyRequests);
router.post('/:id', authMW, serviceCtrl.getRequestById);

// ── Provider endpoints ──────────────────────────────────────

router.put('/:id/status', authMW, roleMW('provider'), serviceCtrl.updateStatus);

module.exports = router;