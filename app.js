const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// db 관련
const db = require('./models');

//flash message 관련
const flash = require('connect-flash');

//login passport 관련
const passport = require('passport');
const session = require('express-session');



class App {

    constructor () {
        this.app = express();

        // db 접속
        this.dbConnection();
        
        // 뷰엔진 셋팅
        this.setViewEngine();

        //session 셋팅
        this.setSession();

        // 미들웨어 셋팅
        this.setMiddleWare();

        // 정적 디렉토리 추가
        this.setStatic();

        // 로컬 변수
        this.setLocals();

        // 라우팅
        this.getRouting();

        // 404 페이지를 찾을수가 없음
        this.status404();

        // 에러처리
        this.errorHandler();


    }

    dbConnection(){
        // DB authentication
        db.sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
            return db.sequelize.sync(); //drop 후 sync해야 db가 update됨. 그럼 기존 데이터는?
        })
        .then(() => {
            console.log('DB Sync complete.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    }


    setMiddleWare (){
        
        // 미들웨어 셋팅
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());//request에서 cookie 사용

    }

    setViewEngine (){

        nunjucks.configure('template', {
            autoescape: true,
            express: this.app
        });

    }

    setSession(){
        this.app.use(session({
            secret:'goTerps',
            resave:false,
            saveUninitialized:true,
            cookie:{
                maxAge:2000*60*60 // duration 2 hrs
            }
        }));
        
        //passport 적용
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        //flash message
        this.app.use(flash());
    }


    setStatic (){
        this.app.use('/uploads', express.static('uploads'));
        this.app.use('/static', express.static('static'));
    }

    setLocals(){

        // 템플릿 변수
        this.app.use( (req, res, next) => {
            this.app.locals.isLogin = true;
            this.app.locals.req_path = req.path;
            next();
        });

    }

    getRouting (){
        this.app.use(require('./controllers'))
    }

    status404() {        
        this.app.use( ( req , res, _ ) => {
            res.status(404).render('common/404.html')
        });
    }

    errorHandler() {

        // this.app.use( (err, req, res,  _ ) => {
        //     res.status(500).render('common/500.html')
        // });
    
    }

}

module.exports = new App().app;