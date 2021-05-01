const express = require('express');
const router = express.Router();
const ctrl = require('./checkout.ctrl');

router.post('/complete', ctrl.post_complete);
router.get('/success', ctrl.get_success);
router.get('/', ctrl.index);

module.exports = router;
