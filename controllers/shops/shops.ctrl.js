const models = require('../../models');

exports.get_shops_detail = async (req, res) => {
    try{
        const shop = await models.Shops.findOne({
            where: {id: req.params.id},
            include: ['Menu', 'LikeUser']
        });
        let active = false;
        if(req.isAuthenticated()){
          const user = await models.User.findByPk(req.user.id);
          active = await shop.hasLikeUser(user)
        }
       
        const countLike = await shop.countLikeUser();
   


        let cartList = {}; // cartList item
        let cartLength=0;
        //check if cartList exists in the cookie

        let sameShops = true;
        if(typeof(req.cookies.cartList) !== 'undefined'){
            //get cartList
            cartList = JSON.parse(unescape(req.cookies.cartList));
            //since cartList is literal instead of an array, Object.keys need to be used
            cartLength = Object.keys(cartList).length;

            for( let key in cartList){
                if(cartList[key].shop_id !== parseInt(req.params.id) )sameShops = false;
            }
        }
            res.render('shops/detail.html', {shop, cartLength, sameShops, active, countLike});
        }catch(e){
            console.log(e);
        }


}

exports.post_shops_like = async(req, res)=>{
    try{
        const shop = await models.Shops.findByPk(req.params.shop_id);
        const user = await models.User.findByPk(req.user.id);

        const status = await user.addLikes(shop);

        res.json({
            status
        })
    }catch (e){
        console.log(e);
    }
};

exports.delete_shops_like = async (req, res) => {
    try {
      const shop = await models.Shops.findByPk(req.params.shop_id);
      const user = await models.User.findByPk(req.user.id);
   
      await user.removeLikes(shop);
     
      res.json({
            message : "success"
        });
    } catch (e) {
       
    }
};
   