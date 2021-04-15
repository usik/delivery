const { Router } = require('express');
const router = Router();
const ctrl = require('./accounts.ctrl');

//user sign up router

router.get('/join', ctrl.get_join);
router.post('/join',ctrl.post_join);
//login router

router.get('/login', ctrl.get_login);



module.exports = router;