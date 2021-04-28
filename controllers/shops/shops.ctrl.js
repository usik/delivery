const models = require('../../models');

exports.get_shops_detail = async (req, res) => {
    try{
        const shop = await models.Shops.findOne({
            where: {id: req.params.id},
            include: ['Menu']
        })
    let cartList = {}; // cartList item
    let cartLength=0;
    //check if cartList exists in the cookie

    let sameShops = true;
    if(typeof(req.cookies.cartList) !== 'undefined'){
        //get cartList
        cartList = JSON.parse(unescape(req.cookies.cartList));
        //since cartList is literal instead of an array, Object.keys need to be used
        cartLength = Object.keys(cartList).length;
    }
        res.render('shops/detail.html', {shop, cartLength, sameShops});
    }catch(e){
        
    }


}