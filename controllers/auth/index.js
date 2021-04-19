const { Router } = require('express');
const router = Router();
const passport = require('../../middleware/passport-facebook');

// http://localhost:3000/auth/facebook 접근시 facebook으로 넘길 url
router.get('/facebook', passport.authenticate('facebook', {scope:'email'}));

//인증후 페이스북에서 이 주소로 리턴해줌. callbackURL과 일치해야함.
router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect:'/auth/facebook/success',
    failureRedirect:'/auth/facebook/fail'
}));
