const models = require('../../models');


exports.get_join = (_,res) =>{
    res.render('accounts/join.html');
}

exports.post_join = async (_, res)=>{
    try{
        await models.User.create(req.body);
        res.send('<script> alert("Join Success");\ location.href="/accounts/login";</script>');
    }catch (e){

    }

}

exports.get_login = (_, res)=>{
    res.render('accounts/login.html');
}