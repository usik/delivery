const models = require('../../models');

exports.get_shops_detail = async (req, res) => {
    try{
        const shop = await models.Shops.findOne({
            where: {id: req.params.id},
            include: ['Menu']
        })
        res.render('shops/detail.html', {shop});
    }catch(e){
        
    }


}