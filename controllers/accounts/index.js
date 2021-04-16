const { Router } = require('express');
const router = Router();
const ctrl = require('./accounts.ctrl');

const passport = require('../../middleware/passport-local');






/*
GET /acounts/login login view
POST /accounts/login login action
GET /accounts/success sucessfuly logged in
GET /accounts/logout logout

*/

//user sign up router

router.get('/join', ctrl.get_join);
router.post('/join',ctrl.post_join);
//login router

router.get('/login', ctrl.get_login);
router.post('/login',
    passport.authenticate('local', {
        failureRedirect:'/accounts/login',
        failureFlash:true
    }),
    ctrl.post_login
);

//session 을 보기 위해서
router.get('/success', ctrl.get_success);

//logout url 추가
router.get('/logout', ctrl.get_logout);





module.exports = router;