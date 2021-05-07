const { Router } = require('express');
const router = Router()
const models = require('../models');

router.use('/admin', require('./admin'));
router.use('/accounts', require('./accounts'));
router.use('/auth', require('./auth'));
router.use('/chat', require('./chat'));
router.use('/shops', require('./shops'));
router.use('/cart', require('./cart'));
router.use('/checkout', require('./checkout'));
router.use('/mypage',require('./mypage'));
router.use('/', require('./home'));

router.get('/', async(_, res)=>{
    const shops = await models.Shops.findAll();
    res.render('home.html', {shops});
});
module.exports = router;