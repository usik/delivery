const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    //결제 총금액
    let totalAmount = 0;
    let cartList = {}; // 장바구니 아이템

    //cookie에 cart가 있는지 먼저 확인
    if(typeof(req.cookies.cartList) !== 'undefined'){
        //장바구니 데이터
        cartList = JSON.parse(unescape(req.cookies.cartList));

        //총 가격을 더해서 전달해준다
        for(const key in cartList){
            totalAmount += parseInt(cartList[key].price);
        }
    }
    res.render('cart/index.html', {cartList, totalAmount});
});

module.exports = router;