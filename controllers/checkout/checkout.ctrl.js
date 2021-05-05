const models = require('../../models');

exports.index = (req, res)=>{

    let totalAmount=0; //total 
    let cartList = {} //cart List
    let shop_id=0;
    let menuArray=[];

    //check if cartList is in the cookie
    if (typeof(req.cookies.cartList) !== 'undefined'){

        //cartList data
        cartList = JSON.parse(unescape(req.cookies.cartList));

        //sum up the total
        for (const key in cartList){
            totalAmount += parseInt(cartList[key].price);
            shop_id = cartList[key].shop_id;
            menuArray.push(parseInt(key));
        }
    }
    res.render('checkout/index.html', {cartList, totalAmount, shop_id, menuArray});
}

exports.post_complete = async (req, res)=>{
    try{
        const checkout = await models.Checkout.create(req.body);

        const menuArray = JSON.parse(req.body.menuArray);

        //in many to many, this is how we access db
        async function asyncSetMenu(menu_id){
            try{
                const menu = await models.ShopsMenu.findByPk( menu_id );
                const status = await checkout.addMenu(menu);
                if(typeof status == 'undefined'){
                    throw `menu :: ${menu_id} doesn't exist.`;
                }
            }catch(e){
                throw e;
            }
        }
        for (const menu_id of menuArray) await asyncSetMenu(menu_id);

        res.json({message:"success"});
    }catch(e){
        console.log(e);
        res.status(400).json({message:e});
    }
};

exports.get_success = (req, res)=>{
    res.render('checkout/success.html');
}