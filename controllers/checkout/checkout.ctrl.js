

exports.index = (req, res)=>{

    let totalAmount=0; //total 
    let cartList = {} //cart List

    //check if cartList is in the cookie
    if (typeof(req.cookies.cartList) !== 'undefined'){

        //cartList data
        cartList = JSON.parse(unescape(req.cookies.cartList));

        //sum up the total
        for (const key in cartList){
            totalAmount += parseInt(cartList[key].price);
        }
    }
    res.render('checkout/index.html', {cartList, totalAmount});
}