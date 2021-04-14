//image destination 
const path = require('path');
const uploadDir = path.join(__dirname, '../uploads'); // __dirname : current folder

//multer setting
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        //destination folder
        callback(null, uploadDir);
    },
    filename: (req,file, callback)=>{
        //shops-date.jpg format
        callback(null,'shops-'+Date.now()+'.'+file.mimetype.split('/')[1]);
    }
});

module.exports=multer ({storage:storage});